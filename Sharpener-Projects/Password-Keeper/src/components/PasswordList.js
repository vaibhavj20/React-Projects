import React, { useContext, useState } from "react";
import { PasswordContext } from "../context/PasswordContext";
import PasswordModal from "./PasswordModal";

const PasswordList = () => {
  const { passwords, deletePassword, searchQuery } =
    useContext(PasswordContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);

  const filteredPasswords = passwords.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>All Passwords</h2>
      <ul className="passwordList">
        {filteredPasswords.map((password) => (
          <li key={password._id}>
            {password.title} - {password.password}
            <div>
              <button
                className="editButton"
                onClick={() => {
                  setCurrentPassword(password);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={() => deletePassword(password._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <PasswordModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setCurrentPassword(null);
        }}
        currentPassword={currentPassword}
      />
    </div>
  );
};

export default PasswordList;
