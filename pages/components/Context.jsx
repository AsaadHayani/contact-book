import { createContext, useState } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    token: "",
  });
  const [auth, setAuth] = useState({ lk: "lk" });

  return (
    <Context.Provider
      value={{
        appState,
        setAppState,
        auth,
        setAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
