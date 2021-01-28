import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Link, makeStyles, Button } from "@material-ui/core";
import { useStore } from "effector-react";
import { $authorized, logout } from "@core/models/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Header() {
  const classes = useStyles();
  const authorized = useStore($authorized);
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Link component={RouterLink} to="/latest/1/" color="inherit">
            Latest
          </Link>
          <div>
            {authorized ? (
              <Button color="inherit" onClick={() => logout()}>
                LOGOUT
              </Button>
            ) : (
              <Link component={RouterLink} to="/auth" color="inherit">
                LOGIN
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
