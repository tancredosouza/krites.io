import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
  console.log("change", newValue);
}

function Editor() {
  return (
    <div className="Editor">
      <header className="App-header">
        <AceEditor
          mode="c_cpp"
          theme="github"
          onChange={onChange}
          name="Editor"
          editorProps={{ $blockScrolling: true }}
        />
      </header>
      <footer>Made with &hearts; by Tantan.</footer>
    </div>
  );
}

export default Editor;
