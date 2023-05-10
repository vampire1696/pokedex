import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Pokemon, fetchPokemonData } from "../pokedex";
import Image from "next/image";
import { Button, Grid, Box } from "@mui/material";
import { teal } from "@mui/material/colors";

type Props = {};

const PokemonPage = (props: Props) => {
  const router = useRouter();
  const id = router.query.id?.toString() ?? "";
  const { data } = useQuery({
    queryKey: ["poke", id],
    queryFn: () => fetchPokemonData(id),
    enabled: !!id,
  });
  console.log(data);
  // [generation-v][black-white].animated[front-default]
  if (data) {
    const pkm: Pokemon =
      data.sprites.versions["generation-v"]["black-white"].animated[
        "front_default"
      ];
    console.log(pkm);
  }
  const whiteColor = teal[50];
  return (
    <Box
      sx={{
        background: " linear-gradient(to bottom,#6ab7f5,#fff)",
        padding: "80px",
        minHeight: "100vh",
        width: "100%",
        // display: "float",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Box
            sx={{
              backgroundImage: `url("https://i.ibb.co/YPMZnvb/pokedex.png")`,
              backgroundSize: "100% 100%",
              height: 639,
              display: "flex",
              justifyContent: "center",
              border: "1px solid green",
              // flexDirection: "column",
              paddingTop: "35%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {data ? (
              <Box width="31%" height="35%">
                {/* eslint-disable-next-line  */}
                <img
                  height="100%"
                  width="100%"
                  style={
                    {
                      // width: "100%",
                      // left: "14%",
                      // top: "31%",
                      // transform: "translate(-63%,20%)",
                    }
                  }
                  src={
                    data.sprites.versions["generation-v"]["black-white"]
                      .animated["front_default"]
                  }
                />

                {/* <Button
                  style={{
                    position: "absolute",
                    width: "227px",
                    left: "8%",
                    top: "64%",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "25px",
                    backgroundColor: "white",
                  }}
                  variant="contained"
                >
                  {data.name}
                </Button> */}
              </Box>
            ) : null}
          </Box>
          {/* <img
            alt="bg_pkd"
            style={{ position: "relative", height: "425" }}
            src="/pokedex.png"
          /> */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={9}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ alignItems: "center", textAlign: "center" }}>
            <h2>ID:{data ? data.id : null}</h2>
          </div>
          <Box
            sx={{
              width: "60vw",
              height: "300px",
              background: "gray",
              color: "white",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <p>Height: {data?.height} </p>
              </Grid>
              <Grid item xs={6}>
                <p>Weight: {data?.weight}kg</p>
              </Grid>
              <Grid item xs={6}>
                <p>
                  Abilities:
                  {data?.abilities.map(
                    (item: any) =>
                      // <p key={index} style={{ display: "float" }}>
                      //  {" "}
                      // </p>
                      item.ability.name + ","
                  )}
                </p>
              </Grid>
              <Grid item xs={6}>
                <p>
                  Type:
                  {data?.types.map((item: any) => item.type.name + ",")}
                </p>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonPage;
