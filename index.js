const express = require("express");
const markdown = require("markdown").markdown;
const app = express();
const fs = require("fs");

const md_content = fs.readFileSync("sample_file.md").toString();

html_content = markdown.toHTML(md_content);

app.get("/", (req, res) => {
  res.send(html_content);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
