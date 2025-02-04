import React, { createContext } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const url = "https://api.settlemyloan.in";
  //
  const getToken = async () => {
    try {
      const res = await fetch(`https://api.singledebt.in/token`);
      const data = await res.json();
      return data.token[0].token;
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <AppContext.Provider value={{ url, getToken }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
