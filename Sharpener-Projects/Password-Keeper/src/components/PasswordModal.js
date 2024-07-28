import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { PasswordContext } from "../context/PasswordContext";

Modal.setAppElement("#root");

const PasswordModal = ({ isOpen, onRequestClose, currentPassword }) => {
  const { addPassword, updatePassword } = useContext(PasswordContext);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentPassword) {
      setTitle(currentPassword.title);
      setPassword(currentPassword.password);
    } else {
      setTitle("");
      setPassword("");
    }
  }, [currentPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword) {
      updatePassword(currentPassword._id, title, password);
    } else {
      addPassword(title, password);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modalContent"
    >
      <h2>{currentPassword ? "Edit Password" : "Add New Password"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="modalButtons">
          <button
            type="button"
            className="cancelButton"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button type="submit" className="updateButton">
            {currentPassword ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
