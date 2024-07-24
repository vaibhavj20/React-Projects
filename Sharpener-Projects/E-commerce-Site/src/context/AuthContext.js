// // src/store/auth-context.js
// import React, { useState } from "react";

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const initialToken = localStorage.getItem("token");
//   const [token, setToken] = useState(initialToken);

//   const userIsLoggedIn = !!token;

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import React, { useState, useEffect } from "react";

// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const initialToken = localStorage.getItem("token");
//   const [token, setToken] = useState(initialToken);

//   const userIsLoggedIn = !!token;

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// context_store/AuthContext.js
// import React, { useState, useEffect } from "react";

// const AuthContext = React.createContext({
//   userLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const userLoggedIn = !!token;

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const contextValue = {
//     userLoggedIn: userLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// context_store/AuthContext.js
// import React, { useState, useEffect } from "react";

// const AuthContext = React.createContext({
//   userLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const userLoggedIn = !!token;

//   const loginHandler = (token) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//   };

//   const logoutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const contextValue = {
//     userLoggedIn: userLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
