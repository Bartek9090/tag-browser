import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [stateA, setStateA] = useState();
  const [stateB, setStateB] = useState();

  const contextValue = {
    stateA,
    setStateA,
    stateB,
    setStateB,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
