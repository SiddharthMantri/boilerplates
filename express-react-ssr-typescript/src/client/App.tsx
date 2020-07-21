import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({ id: new Date().getTime() });
  const click = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const updateState = () => {
    setState((prevState) => ({ ...prevState, id: new Date().getTime() }));
  };
  return (
    <>
      <div>
        This is a test page with {count}
        <button onClick={click}>Click this</button>
      </div>
      <div>
        Current State: {JSON.stringify(state)}
        <button onClick={updateState}>
            Update time
        </button>
      </div>
    </>
  );
};

export default App;
