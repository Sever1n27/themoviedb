import React from "react";
import { useStore } from "effector-react";
import { getRequestToken, $token, getSessionId } from "@core/models/auth";

export function Authorization() {
  const token = useStore($token);
  React.useEffect(() => {
    !token && getRequestToken();
  }, [token]);
  const authUser = React.useCallback(() => {
    const newWindow = window.open(
      `https://www.themoviedb.org/authenticate/${token}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }, [token]);

  return (
    <div>
      <button onClick={authUser}>step1</button>
      <button onClick={() => getSessionId(token || "")}>step2</button>
    </div>
  );
}
