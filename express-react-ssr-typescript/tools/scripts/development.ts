import expressServer from "../../src/server";
import { start } from "repl";
import config from "../../webpack.config";

const PORT = process.env.PORT || 3000;

const startServer = () => {

  const server = expressServer({
    // @ts-ignore
    config,
    mode: "development",
  });

  // Start and listen on port;
  server.listen(PORT, (...cb) => {
    if (cb && cb.length) {
      console.error(cb);
    }
    console.log(`listening on port: ${PORT}`);
  });
};

startServer();
