import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import ProblemStatement from "./problem_statement.md";
import ReactMarkdown from "react-markdown";

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
class App extends Component {
  onLoad() {
    console.log("i've loaded");
  }
  onChange(newValue) {
    console.log("change", newValue);
    this.setState({
      value: newValue,
    });
    console.log("NEW_STATE", this.state.value);
  }

  onSelectionChange(newValue, event) {
    console.log("select-change", newValue);
    console.log("select-change-event", event);
  }

  onCursorChange(newValue, event) {
    console.log("cursor-change", newValue);
    console.log("cursor-change-event", event);
  }

  onValidate(annotations) {
    console.log("onValidate", annotations);
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
  showCode() {
    console.log(this.state.value);
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
    };
    this.setPlaceholder = this.setPlaceholder.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.showCode = this.showCode.bind(this);
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(ProblemStatement)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return (
      <div className="columns">
        <div className="column">
          <h2>Problem Statement</h2>
          <ReactMarkdown source={markdown} />
        </div>
        <div className="examples column">
          <h2>Editor</h2>
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
              enableBasicAutocompletion: this.state.enableBasicAutocompletion,
              enableLiveAutocompletion: this.state.enableLiveAutocompletion,
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
            <button onClick={this.showCode}>Submit answer!</button>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("example"));
