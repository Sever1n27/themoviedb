import React from "react";
import { useStore } from "effector-react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { $token, getSessionId, $sessionId } from "@core/models/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Разрешить доступ на moviedb", "Авторизоваться"];
}

export function Authorization() {
  const [step, setStep] = React.useState(1);
  const steps = getSteps();
  const token = useStore($token);
  const sessionId = useStore($sessionId);

  const authUser = React.useCallback(() => {
    setStep(2);
    const newWindow = window.open(
      `https://www.themoviedb.org/authenticate/${token}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }, [token]);

  return (
    <div>
      {sessionId ? (
        "Authorized!"
      ) : (
        <>
          <Stepper activeStep={step}>
            {steps.map((label, index) => {
              return (
                <Step
                  key={label}
                  active={index + 1 <= step}
                  completed={step > index + 1}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {step === 1 && (
            <button onClick={authUser}>Access on themoviedb</button>
          )}
          {step === 2 && (
            <button onClick={() => getSessionId(token || "")}>Authorize</button>
          )}
        </>
      )}
    </div>
  );
}
