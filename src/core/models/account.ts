import { createEvent, createEffect, forward, attach } from "effector";

import { dataProvider } from "@core/utils/dataProvider";
import { $sessionId, $accountId } from "./auth";

const addMovieToFavorites = createEffect(async (params: any) => {
  return dataProvider(
    `/account/${params.data.account}/favorite?session_id=${params.data.session}`,
    "POST",
    {
      favorite: true,
      media_type: "movie",
      media_id: params.id,
    }
  );
});

const addMovieToWatchList = createEffect(async (params: any) => {
  return dataProvider(
    `/account/${params.data.account}/watchlist?session_id=${params.data.session}`,
    "POST",
    {
      watchlist: true,
      media_type: "movie",
      media_id: params.id,
    }
  );
});

export const addToFavorites = createEvent<number>();
export const addToWatchlist = createEvent<number>();

const addToFavoritesFx = attach({
  effect: addMovieToFavorites,
  source: [$accountId, $sessionId],
  mapParams: (id, [account, session]) => {
    return { id, data: { session: session, account: account } };
  },
});

const addToWatchListFx = attach({
  effect: addMovieToWatchList,
  source: [$accountId, $sessionId],
  mapParams: (id, [account, session]) => {
    return { id, data: { session: session, account: account } };
  },
});

forward({
  from: addToFavorites,
  to: addToFavoritesFx,
});

forward({
  from: addToWatchlist,
  to: addToWatchListFx,
});
