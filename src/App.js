import React, { useState } from "react";
import AceEditor from "react-ace";
import ReactMarkdown from "react-markdown";
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
import Button from "@material-ui/core/Button";
import Popup from "./Popup";

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
    height: "100%",
  },
  innerRoot: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(10, 1),
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "auto", // 16:9
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1, 2),
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
    height: "100%",
    width: "100%",
  },
  editor: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: theme.spacing(0, 2),
    justifyContent: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [placeholder] = useState("Placeholder Text");
  const [theme] = useState("xcode");
  const [mode] = useState("c_cpp");
  const [fontSize] = useState(12);
  const [submissionResult, setSubmissionResult] = useState("");
  const [showPrintMargin] = useState(true);
  const [highlightActiveLine] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const showCode = () => {
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": "secret",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
      body: value,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setSubmissionResult(data);
      })
      .then(() => setShowPopup(true))
      .catch(console.log);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
        <div className={classes.innerRoot}>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12} sm={6}>
              <div className={classes.editor}>
                <Paper className={classes.paper}>
                  <Typography component={"span"}>
                    <ReactMarkdown
                      source={text}
                      escapeHtml={false}
                      renderers={{ paragraph: (props) => <div {...props} /> }}
                    />
                  </Typography>
                </Paper>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.editor}>
                <Paper className={classes.paper}>
                  <AceEditor
                    placeholder={placeholder}
                    mode={mode}
                    theme={theme}
                    name="blah2"
                    onChange={onChange}
                    value={value}
                    height={"95%"}
                    fontSize={fontSize}
                    showPrintMargin={showPrintMargin}
                    showGutter={false}
                    highlightActiveLine={highlightActiveLine}
                    setOptions={{
                      useWorker: false,
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: false,
                      tabSize: 4,
                    }}
                  />
                  <div className={classes.button}>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={showCode}
                    >
                      Submit Code
                    </Button>
                  </div>
                </Paper>
              </div>
            </Grid>
            {showPopup ? (
              <Popup text={submissionResult} closeFunction={togglePopup} />
            ) : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default App;
