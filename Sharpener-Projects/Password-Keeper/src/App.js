import React, { useState } from "react";
import { PasswordProvider } from "./context/PasswordContext";
import Header from "./components/Header";
import PasswordList from "./components/PasswordList";
import SearchBar from "./components/SearchBar";
import PasswordModal from "./components/PasswordModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PasswordProvider>
      <div className="App">
        <Header />
        <button onClick={() => setIsModalOpen(true)} className="addnewpass">
          Add New Password
        </button>
        <SearchBar />
        <PasswordList />
        <PasswordModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      </div>
    </PasswordProvider>
  );
}

export default App;
