// import React from "react";
// import { useState } from "react";
// const AuthContext = React.createContext({
//   token: "",
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// export const AuthContextProvider = (props) => {
//   const [token, setToken] = useState(null);

//   const userLoggedIn = !!token;
//   const loginHandler = () => {
//     setToken(token);
//   };
//   const logoutHandler = () => {
//     setToken(null);
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: userLoggedIn,
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

import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationDate");

    if (storedToken && storedExpirationDate) {
      const remainingTime =
        new Date(storedExpirationDate).getTime() - new Date().getTime();
      if (remainingTime <= 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
      } else {
        setToken(storedToken);
        setTimeout(logoutHandler, remainingTime);
      }
    }
  }, []);

  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    const expirationDate = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
    setTimeout(logoutHandler, 5 * 60 * 1000);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
