import {
  createEvent,
  createEffect,
  createStore,
  forward,
  sample,
} from "effector";
import { dataProvider } from "@core/utils/dataProvider";
import { getCookie } from "@core/utils/getCookie";
import { deleteCookie } from "@core/utils/deleteCookie";

const fetchRequestToken = createEffect(async () => {
  return dataProvider("/authentication/token/new");
});

const fetchSessionId = createEffect(async (token: string) => {
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
    document.cookie = `sessionId=${data.session_id}`;
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

export const $authorized = $sessionId.map((id) => (id ? true : false));

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

restoreSessionIdFromCookies();
