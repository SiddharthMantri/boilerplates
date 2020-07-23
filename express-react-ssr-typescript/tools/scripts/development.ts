import server from "../../src/server";
import { start } from "repl";

const PORT = process.env.PORT || 3000;

const startServer = () => {
  server.listen(PORT, (...cb) => {
    if (cb && cb.length) {
      console.error(cb);
    }
    console.log(`listening on port: ${PORT}`);
  });
};

startServer();
