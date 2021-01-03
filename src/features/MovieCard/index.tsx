import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Movie } from "@types";

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  cursor: pointer;
  background: #ffefef;
  border-radius: 4px;
  padding: 20px;
  color: black;
  text-decoration: none;
  & + & {
    margin-top: 20px;
  }
`;

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

const VoteAverage = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

type Props = {
  movie: Movie;
};

export function MovieCard(props: Props) {
  const { movie } = props;
  return (
    <StyledLink to={`/movie/${movie.id}`}>
      <Image
        src={`${process.env.RAZZLE_IMAGES_URL_SMALL}${movie.poster_path}`}
      />
      <Description>
        <Title>{movie?.title}</Title>
        <Overview>{movie?.overview}</Overview>
        <VoteAverage>Rating: {movie?.vote_average}</VoteAverage>
      </Description>
    </StyledLink>
  );
}
