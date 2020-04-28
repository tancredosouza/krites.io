import React, { Component, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import ProblemStatement from "./problem_statement.md";
import ReactMarkdown from "react-markdown";
import SubmissionResult from "./SubmissionResult";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import "ace-builds/src-noconflict/mode-jsx";
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

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
}));

export default function FunctionalApp() {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [placeholder, setPlaceholder] = useState("Placeholder Text");
  const [theme, setTheme] = useState("monokai");
  const [mode, setMode] = useState("c_cpp");
  const [enableBasicAutocompletion, setBasicAutocomplete] = useState(true);
  const [enableLiveAutocompletion, setLiveAutocomplete] = useState(true);
  const [fontSize, setFontSize] = useState(12);
  const [showGutter, setShowGutter] = useState(true);
  const [showPrintMargin, setShowPrintMargin] = useState(true);
  const [highlightActiveLine, sethighlightActiveLine] = useState(true);
  const [enableSnippets, setenableSnippets] = useState(true);
  const [showLineNumbers, setshowLineNumbers] = useState(true);
  const [submissionResult, setsubmissionResult] = useState("");
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
            <Paper className={classes.paper}>
              <ReactMarkdown source={markdown} />
            </Paper>
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
                  enableBasicAutocompletion: enableBasicAutocompletion,
                  enableLiveAutocompletion: enableLiveAutocompletion,
                  enableSnippets: enableSnippets,
                  showLineNumbers: showLineNumbers,
                  tabSize: 2,
                }}
              />
              <div className="field">
                <label>Theme:</label>
                <p className="control">
                  <span className="select">
                    <select name="Theme" value={theme}>
                      {themes.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </span>
                </p>
                <button>Submit answer!</button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

//export default FunctionalApp();

/*
class App extends Component {
  onLoad() {
    //console.log("i've loaded");
  }
  onChange(newValue) {
    //console.log("change", newValue);
    this.setState({
      value: newValue,
    });
    //console.log("NEW_STATE", this.state.value);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  onSelectionChange(newValue, event) {
    //console.log("select-change", newValue);
    //console.log("select-change-event", event);
  }

  onCursorChange(newValue, event) {
    //console.log("cursor-change", newValue);
    //console.log("cursor-change-event", event);
  }

  onValidate(annotations) {
    //console.log("onValidate", annotations);
  }

  setPlaceholder(e) {
    this.setState({
      placeholder: e.target.value,
    });
  }
  setTheme(e) {
    this.setState({
      theme: e.target.value,
    });
  }
  setMode(e) {
    this.setState({
      mode: e.target.value,
    });
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value,
    });
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10),
    });
  }
  async sendCode() {
    // should send code to code processor
    //console.log(this.state.value);
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
    this.togglePopup();
  }

  constructor(props) {
    super(props);
    this.state = {
      markdown: "",
      value: defaultValue,
      placeholder: "Placeholder Text",
      theme: "monokai",
      mode: "c_cpp",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      fontSize: 12,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: true,
      showLineNumbers: true,
      submissionResult: "",
      showPopup: false,
    };
    this.setPlaceholder = this.setPlaceholder.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.sendCode = this.sendCode.bind(this);
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(ProblemStatement)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const classes = useStyles();
    const { markdown } = this.state;
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
              <Paper className={classes.paper}>
                <ReactMarkdown source={markdown} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <AceEditor
                  placeholder={this.state.placeholder}
                  mode={this.state.mode}
                  theme={this.state.theme}
                  name="blah2"
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  onSelectionChange={this.onSelectionChange}
                  onCursorChange={this.onCursorChange}
                  onValidate={this.onValidate}
                  value={this.state.value}
                  fontSize={this.state.fontSize}
                  showPrintMargin={this.state.showPrintMargin}
                  showGutter={this.state.showGutter}
                  highlightActiveLine={this.state.highlightActiveLine}
                  setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: this.state
                      .enableBasicAutocompletion,
                    enableLiveAutocompletion: this.state
                      .enableLiveAutocompletion,
                    enableSnippets: this.state.enableSnippets,
                    showLineNumbers: this.state.showLineNumbers,
                    tabSize: 2,
                  }}
                />
                <div className="field">
                  <label>Theme:</label>
                  <p className="control">
                    <span className="select">
                      <select
                        name="Theme"
                        onChange={this.setTheme}
                        value={this.state.theme}
                      >
                        {themes.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </span>
                  </p>
                  <button onClick={this.sendCode}>Submit answer!</button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
*/
