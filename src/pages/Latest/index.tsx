import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import "./model";
import {
  changePage,
  $latestFilms,
  $currentPage,
  $isLoading,
  $totalPages,
} from "./model";
import { Pagination, Preloader } from "@features";
import { MovieCard } from "@ui";

const Title = styled.h1``;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export function Latest() {
  const latestFilms = useStore($latestFilms);
  const currentPage = useStore($currentPage);
  const totalPages = useStore($totalPages);
  const isLoading = useStore($isLoading);
  const { page }: { page: any } = useParams();

  React.useEffect(() => {
    changePage(page);
  }, [page]);

  return (
    <Container>
      {isLoading && <Preloader />}
      <Title>Latest films</Title>
      <Pagination
        loading={isLoading}
        current={currentPage}
        total={totalPages}
      />
      <CardsWrapper>
        {latestFilms &&
          latestFilms.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </CardsWrapper>
      <Pagination
        loading={isLoading}
        current={currentPage}
        total={totalPages}
      />
    </Container>
  );
}
