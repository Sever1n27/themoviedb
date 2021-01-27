import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export function Preloader() {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);
  const delay = 250;
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => {
    timeout.current = setTimeout(() => setVisible(true), delay);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, []);
  return visible ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : null;
}
