import React, { Component, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
import SubmissionResult from "./SubmissionResult";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import text from "./problem_statement";
import Typography from "@material-ui/core/Typography";
import "ace-builds/src-noconflict/mode-jsx";
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import * as renderers from "react-markdown-github-renderers";
const languages = ["c_cpp"];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const defaultValue = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello, world!" << endl;
  return 0;
}`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(1, 1),
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
  problem: {
    width: "100%",
  },
}));

const FunctionalApp = () => {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [placeholder, setPlaceholder] = useState("Placeholder Text");
  const [theme, setTheme] = useState("github");
  const [mode, setMode] = useState("c_cpp");
  const [fontSize, setFontSize] = useState(12);
  const [showGutter, setShowGutter] = useState(true);
  const [showPrintMargin, setShowPrintMargin] = useState(true);
  const [highlightActiveLine, sethighlightActiveLine] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [markdown, setMarkdown] = useState("# Hello");

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const showCode = () => {
    fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": "secret",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: this.state.value,
    })
      .then((response) => response.text())
      .then((data) => this.setState({ submissionResult: data }))
      .catch(console.log);
    togglePopup();
  };

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
        <Grid container direction="row" spacing={1} justify="center">
          <Grid item xs={12} sm={6}>
            <div className={classes.problem}>
              <Paper className={classes.paper}>
                <Typography variant="body1">
                  <ReactMarkdown
                    source={text}
                    escapeHtml={false}
                    renderers={renderers}
                  />
                </Typography>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <AceEditor
                placeholder={placeholder}
                mode={mode}
                theme={theme}
                name="blah2"
                onChange={onChange}
                //onLoad={onLoad}
                //onSelectionChange={onSelectionChange}
                //onCursorChange={onCursorChange}
                //onValidate={onValidate}
                value={value}
                fontSize={fontSize}
                showPrintMargin={showPrintMargin}
                showGutter={showGutter}
                highlightActiveLine={highlightActiveLine}
                setOptions={{
                  useWorker: false,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 4,
                }}
              />
              <div className="field">
                <button>Submit answer!</button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FunctionalApp;
