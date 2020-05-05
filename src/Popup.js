import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles(() => ({
  popup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#02fae0",
  },
  popup_inner: {
    position: "absolute",
    left: "25%",
    right: "25%",
    top: "25%",
    bottom: "25%",
    margin: "auto",
    background: "white",
  },
}));

const Popup = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.popup}>
      <div className={classes.popup_inner}>
        <h1>{props.text}</h1>
      </div>
    </div>
  );
};

export default Popup;
