import React from "react";
import "./App.css";

class SubmissionResult extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <center>
            <h1>Result</h1>
          </center>
          <center>
            <h2>{this.props.submissionResult}</h2>
          </center>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default SubmissionResult;
