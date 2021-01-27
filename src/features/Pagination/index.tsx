import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { generatePath } from "react-router";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

type Props = {
  current: number;
  total: number;
  loading: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function Pagination(props: Props) {
  const { current, total, loading } = props;
  const pages = Array.from(Array(total).keys()).map((number) => number + 1);
  const history = useHistory();
  const match = useRouteMatch();
  const classes = useStyles();
  const handleClick = React.useCallback(
    (number) => {
      history.push(generatePath(match.path, { page: number }));
    },
    [match]
  );
  const shownPages = pages.filter((number) =>
    number >= current ? number - current < 3 : current - number < 3
  );

  return (
    <div className={classes.root}>
      <ButtonGroup size="small">
        {!shownPages.includes(1) && (
          <Button disabled={loading} onClick={() => handleClick(1)}>
            1
          </Button>
        )}
        {shownPages.map((number) => (
          <Button
            disabled={loading}
            color={number === current ? "primary" : "default"}
            onClick={() => handleClick(number)}
            key={number}
          >
            {number}
          </Button>
        ))}
        {!shownPages.includes(pages.length) && (
          <Button disabled={loading} onClick={() => handleClick(pages.length)}>
            {pages.length}
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
