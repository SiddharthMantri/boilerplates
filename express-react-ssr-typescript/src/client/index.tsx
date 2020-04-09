import React from "react";
import ReactDOM from "react-dom";

ReactDOM.hydrate(<div className="my-class" />, document.getElementById("root"));

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
