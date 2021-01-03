import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import {
  $isLoading,
  $movieDetails,
  fetchMovieDetails,
  reset,
} from "@core/moviepage";

const Title = styled.h1``;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export function Movie() {
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    fetchMovieDetails(parseInt(id));
    return () => reset();
  }, [id]);
  const movieDetails = useStore($movieDetails);
  const isLoading = useStore($isLoading);
  return (
    <Container>
      {isLoading && <div>isLoading</div>}
      {movieDetails && <Title>{movieDetails?.title}</Title>}
    </Container>
  );
}
