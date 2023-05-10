import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
type Props = {
  id: number | string;
  name: string;
  image: string;
};

const CardPokemon = (props: Props) => {
  return (
    <Link style={{ textDecoration: "none" }} href={`/pokemon/${props.id}`}>
      <Card sx={{ maxWidth: 245 }}>
        <CardMedia
          sx={{ height: 245 }}
          image={props.image}
          title={props.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            // component="div"
          >
            {props.name[0].toUpperCase() + props.name.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardPokemon;
