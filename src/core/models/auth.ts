import { createEvent, createEffect, createStore, forward } from "effector";
import { dataProvider } from "@core/utils/dataProvider";

const fetchRequestToken = createEffect(async () => {
  return dataProvider("/authentication/token/new");
});

const fetchSessionId = createEffect(async (token: string) => {
  return dataProvider("/authentication/session/new", "POST", {
    request_token: token,
  });
});

export const getRequestToken = createEvent();
export const getSessionId = createEvent<string>("");
export const reset = createEvent();
export const $isLoading = fetchRequestToken.pending;
export const $token = createStore(null)
  .on(fetchRequestToken.doneData, (_, data) => data.request_token)
  .reset(reset);

export const $sessionId = createStore(null)
  .on(fetchSessionId.doneData, (_, data) => data)
  .reset(reset);

forward({
  from: getRequestToken,
  to: fetchRequestToken,
});

forward({
  from: getSessionId,
  to: fetchSessionId,
});
