import { createEvent, createEffect, sample, restore } from "effector";
import { dataProvider } from "@core/utils/dataProvider";

const getLatestFilms = createEffect(async (page = 1) => {
  return dataProvider(`movie/popular/?page=${page}`);
});

const $state = restore(getLatestFilms, null);

export const $currentPage = $state.map((state) => state?.page);
export const $latestFilms = $state.map((state) => state?.results);
export const $totalPages = $state.map((state) => state?.total_pages);
export const $totalResults = $state.map((state) => state?.total_results);
export const $isLoading = getLatestFilms.pending;

export const changePage = createEvent<number>();

sample({
  source: $currentPage,
  clock: changePage,
  fn: (_, value) => value,
  target: getLatestFilms,
});

$latestFilms.watch((data) => {
  console.log(data);
});

getLatestFilms(1);
