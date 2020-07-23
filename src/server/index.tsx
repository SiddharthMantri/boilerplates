import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ssr from "./middlewares/ssr";
import graphqlServer from "./apolloServer/index";

type ServerArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
};

const expressServer = ({ mode, config }: ServerArgs): express.Application => {
  const app = express();

  // apply the app as a middleware to the graphqlServer
  graphqlServer.applyMiddleware({ app });

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

  // use ssr as a middleware on all routes after the Webpack middlewares above have been run
  app.use(ssr());
  
  // app will be started in the development script
  return app;
};

export default expressServer;
