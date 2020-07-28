import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { ApolloServer } from "apollo-server-express";
import createSchemas from "./schema";
import ssr from "./middlewares/ssr";

type ServerArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
};

const expressServer = async ({
  mode,
  config,
}: ServerArgs): Promise<express.Application> => {
  // create express application
  const app = express();

  // use createSchemas to stitch local and remote schemas into one async
  const schema = await createSchemas();

  /* apply our stitched schemas to our graphqlServer so everthing is served from 
  only one endpoint "/graphql" */
  const graphqlServer = new ApolloServer({ schema });

  // apply the app as a middleware to the graphqlServer
  graphqlServer.applyMiddleware({ app });

  // serve assets statically before other middleware runs (and compiles code)
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
