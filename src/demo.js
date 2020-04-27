import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(2, 3),
  },
  media: {
    height: 0,
    paddingTop: "auto", // 16:9
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  logo: {
    maxWidth: 160,
  },
}));

export default function AutoGridNoWrap() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <AppBar color="inherit" position="static">
          <Toolbar>
            <img
              src={require("./logo.png")}
              alt="logo"
              className={classes.logo}
            />
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.root}>
        <Grid container direction="row" spacing={3} justify="center">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
