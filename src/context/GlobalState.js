import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalState = (props) => {
  const [user, setUser] = useState({});

  const SET_USER = (user) => {
    setUser(user);
  };

  return (
    <GlobalContext.Provider value={{ user, SET_USER }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;

