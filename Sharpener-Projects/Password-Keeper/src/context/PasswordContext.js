import React, { createContext, useState, useEffect } from "react";
import {
  getPasswords,
  addPassword as apiAddPassword,
  updatePassword as apiUpdatePassword,
  deletePassword as apiDeletePassword,
} from "../services/api";

const PasswordContext = createContext();

const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      const passwords = await getPasswords();
      setPasswords(passwords);
    };
    fetchPasswords();
  }, []);

  const addPassword = async (title, password) => {
    const newPassword = { title, password };
    const addedPassword = await apiAddPassword(newPassword);
    setPasswords([...passwords, addedPassword]);
  };

  const updatePassword = async (id, updatedTitle, updatedPassword) => {
    const updatedPasswordObj = {
      title: updatedTitle,
      password: updatedPassword,
    };
    await apiUpdatePassword(id, updatedPasswordObj);
    setPasswords(
      passwords.map((p) =>
        p._id === id ? { _id: id, ...updatedPasswordObj } : p
      )
    );
  };

  const deletePassword = async (id) => {
    await apiDeletePassword(id);
    setPasswords(passwords.filter((p) => p._id !== id));
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        addPassword,
        updatePassword,
        deletePassword,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export { PasswordContext, PasswordProvider };
