import express from "express";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import ssr from "./middlewares/ssr";

const PORT = "3000";
const app = express();

// use the ssr middleware on this route
app.use("/", ssr());

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`listening on port: ${PORT}`);
});

export default app;

