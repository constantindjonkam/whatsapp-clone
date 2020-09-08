import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import "./App.css";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";
import userService from "./components/services/userService";
import Unavailable from "./components/Unavailable";

function App() {
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    const newUser = await userService();
    setUser(newUser);
  };

  const screen = useMediaQuery("(max-width:695px)");

  if (screen) return <Unavailable />;

  if (!user) return <Login onSubmit={handleSignUp} />;

  return (
    <div className="App">
      <Router>
        <SideBar avatar={user.photoURL} email={user.email} />
        <Switch>
          <Route path="/chat/:groupId">
            <Chat user={user} />
          </Route>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
