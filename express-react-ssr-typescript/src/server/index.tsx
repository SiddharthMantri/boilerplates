import express from "express";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import App from "../client/App";

const PORT = "3000";
const app = express();

app.get("/", (req, res) => {
  const content = renderToString(<App />);
  const html = `
    <!doctype html>
    <html>
      <head />
      <body>
        <div id="root">${content}</div>
        <script src="main.js"></script>
      </body>
    </html>`;

  res.send(html);
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`listening on port: ${PORT}`);
});

export default app;

