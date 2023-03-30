import useLocalStorage from "../hooks/useLocalStorage";
import React, { useContext } from "react";

export const AuthContext = React.createContext([null, () => {}]);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("auth", null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
