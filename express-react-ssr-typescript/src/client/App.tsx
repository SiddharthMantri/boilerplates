import React from "react";

const App = () => {
    const click = () => {
        console.log("Hey this is a logged event")
    }
    return (
        <>
            This is a test page
            <button onClick={click}>
                Click this
            </button>
        </>
    )
}

export default App;