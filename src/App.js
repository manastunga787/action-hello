import React, { useState, useRef, useEffect } from "react";



function App() {
  const [connected, setConnected] = useState(false);
  const [serverMessages, setServerMessage] = useState([]);
  let ws = useRef(null);

  const txtRef = useRef();

  const handleConnected = () => {
    setConnected(true);
  }
  const handleDisconnected = () => {
    console.log("handle close fired");
    setConnected(false);
  }
  const handleNewMessage = (msgObj) => {
    console.log("messages", serverMessages);



    setServerMessage((prev) => {
      const newArr = [...prev, msgObj.data];
      return newArr;
    });
  }
  const handleClick = () => {
    if (!connected) {
      ws.current = new WebSocket("wss://hackheap.online/wsapp");
      ws.current.onopen = handleConnected;
      ws.current.onclose = handleDisconnected;
      ws.current.onmessage = handleNewMessage;

    } else {
      if (ws) {
        ws.current.close();
      } else {
        console.log("ws is null", ws);
      }
    }
  }

  useEffect(() => {


  })

  const handleSend = () => {
    const msg = txtRef.current.value;

    if (msg)
      ws.current.send(msg);
  }


  console.log("...", serverMessages);

  return (
    <div className="App">
      <h2>Hello</h2>
      {connected && <h2 style={{ color: "green" }}>Connected</h2>}
      {connected && <div>
        <input type="text" ref={txtRef} />
        <button onClick={handleSend}>Send</button>

      </div>}
      <button onClick={handleClick}>{connected ? "Disconect" : "Connect"}</button>
      <div>
        <h2>Messages are: </h2>
        <ul>
          {serverMessages.map((msg, i) => <li key={i}><p>{msg}</p></li>)}
        </ul>
      </div>
    </div >
  );
}

export default App;
