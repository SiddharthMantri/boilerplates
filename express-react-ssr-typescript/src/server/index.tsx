import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.config";
import ssr from "./middlewares/ssr";

const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));

if (process.env.mode !== "production") {
  // @ts-ignore
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      quiet: true,
      noInfo: true,
      publicPath: config.output.publicPath,
    })
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
    })
  );
}

// use the ssr middleware on this route
app.use("/", ssr());

export default app;
