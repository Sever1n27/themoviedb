import { createEvent, createEffect, createStore, forward } from "effector";
import { dataProvider } from "@core/utils/dataProvider";
import { MovieDetails } from "@types";

const getMovieDetails = createEffect(async (id: number) => {
  return dataProvider(`/movie/${id}`);
});

export const fetchMovieDetails = createEvent<number>();
export const reset = createEvent();
export const $isLoading = getMovieDetails.pending;
export const $movieDetails = createStore<MovieDetails | null>(null)
  .on(getMovieDetails.doneData, (_, data) => data)
  .reset(reset);

forward({
  from: fetchMovieDetails,
  to: getMovieDetails,
});
