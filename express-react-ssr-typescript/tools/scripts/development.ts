import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import server from "../../src/server";
import config from "../../webpack.config";

// @ts-ignore
const compiler = webpack(config);

server.use(
  webpackDevMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);

server.use(
  webpackHotMiddleware(compiler, {
    log: false,
  })
);
