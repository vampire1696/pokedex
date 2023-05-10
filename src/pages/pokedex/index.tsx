import Head from "next/head";
import { Pagination, PaginationItem, Grid, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import CardPokemon from "@/components/CardPokemon";

type ArrayGenerator = (dep: number) => number[];

const generateArray: ArrayGenerator = (dep) => {
  const start = (dep - 1) * 20 + 1;
  const end = start + 19;
  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
};
export interface Pokemon {
  //dinh nghia interface de su duong Pokemon. gi do
  name: string;
  id: number;
  [key: string]: any;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    front_default: string;
    [key: string]: any;
  };
}
export const fetchPokemonData = async (id: number | string) => {
  const result = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return result.data;
};
export default function Home() {
  const router = useRouter();

  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page.toString()));
    } else setPage(1);
  }, [router.query.page]);

  const arr = useMemo(() => generateArray(page), [page]);

  const result = useQueries({
    // array chua 20 pokemon
    queries: arr.map((item) => {
      return {
        queryKey: ["poke", item],
        queryFn: () => fetchPokemonData(item),
      };
    }),
  });

  const pokemonList = useMemo(() => {
    if (
      !result ||
      result.some((item) => {
        //kiem tra tat ca item da fetch xong chua, neu chi can 1 item thoa man dieu kien thi se tra lai boolean la true
        return item.data == null || item.data == undefined;
      })
    )
      return [];

    // kiem tra result da fetch xong chua
    return result.map((x) => {
      const pkm = x.data;
      return pkm as Pokemon;
    });
  }, [result]);

  console.log(pokemonList);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // setPage(value);
    if (value > 1)
      router.push({ pathname: "/pokedex", query: { page: value } });
    else router.push("/pokedex");
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box width="60%">
          <Grid container spacing={1} justifyContent="space-between">
            {pokemonList?.length
              ? pokemonList.map((pokemon) => (
                  <Grid key={pokemon.id} item xs={12} sm={6} md={3}>
                    {/* xs co nho nhat, sm co nho,md co vua */}
                    <CardPokemon
                      name={pokemon.name}
                      id={pokemon.id}
                      image={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                    />
                  </Grid>
                ))
              : null}
          </Grid>
        </Box>
      </Box>
      <Box mt={4} mb={3} display="flex" justifyContent="center">
        <Box>
          <Pagination
            sx={{ width: "100%" }}
            count={50}
            page={page}
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
}
