import {
  createEvent,
  createEffect,
  createStore,
  forward,
  sample,
  combine,
  restore,
} from "effector";
import { dataProvider } from "@core/utils/dataProvider";
import { getCookie, deleteCookie, setCookie } from "@core/utils/cookies";

const fetchRequestToken = createEffect(async () => {
  return dataProvider("/authentication/token/new");
});

export const fetchSessionId = createEffect(async (token: string) => {
  return dataProvider("/authentication/session/new", "POST", {
    request_token: token,
  });
});

const logoutEffect = createEffect(async (sessionId: string) => {
  return dataProvider("/authentication/session", "DELETE", {
    session_id: sessionId,
  });
});

const restoreSessionIdFromCookies = createEffect(async () => {
  const sessionId = getCookie("sessionId");
  if (sessionId) {
    return sessionId;
  } else throw new Error();
});

export const getRequestToken = createEvent();
export const getSessionId = createEvent<string>("");
export const reset = createEvent();
export const logout = createEvent();
export const $isLoading = fetchRequestToken.pending;
export const $tokenData = createStore<any>(null)
  .on(fetchRequestToken.doneData, (_, data) => data)
  .reset(reset);
export const $token = $tokenData.map((data) => data?.request_token);
export const $sessionData = createStore(null)
  .on(fetchSessionId.doneData, (_, data) => {
    setCookie("sessionId", data.session_id, null);
    return data;
  })
  .reset(reset);

export const $sessionId = $sessionData
  .map((data: any) => data?.session_id)
  .on(restoreSessionIdFromCookies.doneData, (_, data) => data)
  .on(logoutEffect.done, () => {
    deleteCookie("sessionId");
    return "";
  });
const fetchAccountDetails = createEffect(async (sessionId: string) => {
  return dataProvider("/account", "GET", {
    session_id: sessionId,
  });
});
export const $accountDetails = restore(fetchAccountDetails.doneData, null);
export const $accountId = $accountDetails.map((data) => data?.id);

export const $authorized = combine(
  $sessionId,
  $accountId,
  ($sessionId, $accountId) => !!$sessionId && !!$accountId
);

forward({
  from: restoreSessionIdFromCookies.fail,
  to: getRequestToken,
});

forward({
  from: getRequestToken,
  to: fetchRequestToken,
});

forward({
  from: getSessionId,
  to: fetchSessionId,
});

sample({
  source: $sessionId,
  clock: logout,
  target: logoutEffect,
});

forward({
  from: logoutEffect.done,
  to: getRequestToken,
});

sample({
  source: $sessionId,
  clock: [fetchSessionId.done, restoreSessionIdFromCookies.done],
  target: fetchAccountDetails,
});

restoreSessionIdFromCookies();
