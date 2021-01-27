import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import { Preloader } from "@features";
import { $isLoading, $movieDetails, fetchMovieDetails, reset } from "./model";

const Title = styled.h1``;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Poster = styled.img`
  display: block;
`;

export function Movie() {
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    fetchMovieDetails(parseInt(id));
    return () => reset();
  }, [id]);
  const movieDetails = useStore($movieDetails);
  const isLoading = useStore($isLoading);
  console.log(movieDetails);
  return (
    <Container>
      {isLoading && <Preloader />}
      {movieDetails && (
        <div>
          <Title>{movieDetails?.title}</Title>
        </div>
      )}
    </Container>
  );
}
