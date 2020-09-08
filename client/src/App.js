import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Room from "./routes/room";
import CreateRoom from "./routes/createRoom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
