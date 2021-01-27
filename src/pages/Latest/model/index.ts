import { createEvent, createEffect, sample, restore } from "effector";
import { dataProvider } from "@core/utils/dataProvider";
import { MovieList } from "@types";
const getLatestFilms = createEffect(async (page = 1) => {
  return dataProvider(`movie/popular/?page=${page}`);
});

const $state = restore(getLatestFilms, null);

export const $currentPage = $state.map((state: MovieList) => state?.page);
export const $latestFilms = $state.map((state: MovieList) => state?.results);
export const $totalPages = $state.map((state: MovieList) => state?.total_pages);
export const $totalResults = $state.map(
  (state: MovieList) => state?.total_results
);
export const $isLoading = getLatestFilms.pending;

export const changePage = createEvent<number>();

sample({
  source: $currentPage,
  clock: changePage,
  fn: (_, value) => value,
  target: getLatestFilms,
});

getLatestFilms(1);
