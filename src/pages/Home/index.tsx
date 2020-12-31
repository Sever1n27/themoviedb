import React from 'react';
import styled from 'styled-components';
import {useStore} from 'effector-react'
import '@core/homepage';
import {changePage, $latestFilms, $currentPage, $isLoading, $totalPages} from '@core/homepage'
import {Pagination} from "@features"

const Title = styled.h1``;

const Container = styled.div`
  border: 1px solid red;
`;

export function Home() {
  const latestFilms = useStore($latestFilms)
  const currentPage = useStore($currentPage)
  const totalPages = useStore($totalPages)
  const isLoading = useStore($isLoading)
  return (
    <Container color="#333">
      {isLoading && <div>isLoading</div>}
      {latestFilms && latestFilms.map((film: any) =><div key={film.id}>{film.original_title}</div>)}
      <Pagination onClick={changePage} loading={isLoading} current={currentPage} total={totalPages} />
    </Container>
  );
}
