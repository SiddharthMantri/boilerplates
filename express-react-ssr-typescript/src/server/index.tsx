import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ssr from "./middlewares/ssr";

type ServerArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
};

const expressServer = ({ mode, config }: ServerArgs): express.Application => {
  const app = express();
  app.use(express.static(path.resolve(__dirname, "dist")));

  if (mode !== "production") {
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

  return app;
};

export default expressServer;
