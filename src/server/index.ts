import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { ApolloServer } from "apollo-server-express";
import createSchema from "./schema";
import ssr from "./middlewares/ssr";

type ServerArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
};

const expressServer = async ({
  mode,
  config,
}: ServerArgs): Promise<express.Application> => {
  const app = express();

  const schema = await createSchema();

  const graphqlServer = new ApolloServer({ schema });
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

  app.use(ssr());

  // app will be started in the tools/development script
  return app;
};

export default expressServer;
