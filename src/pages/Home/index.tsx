import React from "react";
import styled from "styled-components";
import { useStore } from "effector-react";
import "@core/homepage";
import {
  changePage,
  $latestFilms,
  $currentPage,
  $isLoading,
  $totalPages,
} from "@core/homepage";
import { Pagination, MovieCard } from "@features";

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

export function Home() {
  const latestFilms = useStore($latestFilms);
  const currentPage = useStore($currentPage);
  const totalPages = useStore($totalPages);
  const isLoading = useStore($isLoading);
  return (
    <Container>
      {isLoading && <div>isLoading</div>}
      <CardsWrapper>
        {latestFilms &&
          latestFilms.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </CardsWrapper>
      <Pagination
        onClick={changePage}
        loading={isLoading}
        current={currentPage}
        total={totalPages}
      />
    </Container>
  );
}
