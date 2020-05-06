import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

/*
class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}
*/

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  popup: {
    padding: theme.spacing(50, 0),
    position: "absolute",
    width: "100%",
  },
  popup_inner: {
    position: "absolute",
    left: "25%",
    right: "25%",
    margin: "auto",
    background: "white",
  },
}));

const Popup = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.popup}>
      <div className={classes.popup_inner}>
        <Paper className={classes.paper}>
          <Typography component={"span"}>
            <h1>{props.text}</h1>
          </Typography>
          <Button onClick={props.closeFunction}>Close</Button>
        </Paper>
      </div>
    </div>
  );
};

export default Popup;
