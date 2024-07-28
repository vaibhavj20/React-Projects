import React, { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";

const Header = () => {
  const { passwords } = useContext(PasswordContext);
  return (
    <div className="header">
      <h1>Password Keeper</h1>
      <p>Total Passwords: {passwords.length}</p>
    </div>
  );
};

export default Header;
