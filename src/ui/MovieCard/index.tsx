import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";
import { Movie } from "@types";
import { makeStyles, Card, Button, ButtonGroup } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { $authorized } from "@core/models/auth";
import { addToFavorites, addToWatchlist } from "@core/models/account";

const StyledLink = styled(Link)`
  display: flex;
  cursor: pointer;
  border-radius: 4px;
  padding: 20px 20% 20px 20px;
  color: black;
  text-decoration: none;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& + &": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Title = styled.h3``;

const Overview = styled.p``;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 160px;
  display: block;
  border-radius: 4px;
  margin-right: 20px;
`;

const Ratings = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
`;

type Props = {
  movie: Movie;
};

export function MovieCard(props: Props) {
  const { movie } = props;
  const classes = useStyles();
  const authorized = useStore($authorized);
  console.log(authorized);
  return (
    <Card className={classes.root}>
      <StyledLink to={`/movie/${movie.id}`}>
        <Image
          src={`${process.env.RAZZLE_IMAGES_URL_SMALL}${movie.poster_path}`}
        />
        <Description>
          <Title>{movie?.title}</Title>
          <Overview>{movie?.overview}</Overview>
          <Ratings>
            Rating:
            <Rating
              max={10}
              name="read-only"
              value={movie?.vote_average}
              readOnly
            />
          </Ratings>
        </Description>
      </StyledLink>
      {authorized && (
        <ButtonGroup>
          <Button onClick={() => addToFavorites(movie?.id)}>
            add to favorites
          </Button>
          <Button onClick={() => addToWatchlist(movie?.id)}>
            add to watchlist
          </Button>
        </ButtonGroup>
      )}
    </Card>
  );
}
