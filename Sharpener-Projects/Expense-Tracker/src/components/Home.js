import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, database } from "../auth/firebase";
import ProfileSection from "./ProfileSection";
import ProfileForm from "./ProfileForm";
import "../styles/Home.css";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmailVerified(user.emailVerified);
        setShowVerifyButton(!user.emailVerified);
        fetchProfileData(user.uid);
      } else {
        setUserId(null);
        setFullName("");
        setPhotoUrl("");
        setProfileUpdated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid) => {
    try {
      const snapshot = await get(ref(database, "users/" + uid));
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setFullName(userData.fullName || "");
        setPhotoUrl(userData.photoURL || "");
        setProfileUpdated(true);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
    setLoading(false);
  };

  const handleCompleteClick = () => {
    setShowForm(true);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      localStorage.removeItem("idToken");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      setLoggingOut(false); // Stop loading if error occurs
    }
  };
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="home-container-new">
      <nav className="navbar-new">
        <h1 className="welcome-text">Welcome to Expense Tracker</h1>
        <div className="navbar-buttons">
          {!loggingOut && (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <ProfileSection
                loading={loading}
                profileUpdated={profileUpdated}
                emailVerified={emailVerified}
                showVerifyButton={showVerifyButton}
                handleCompleteClick={handleCompleteClick}
              />
            </>
          )}
        </div>
      </nav>
      <hr className="divider-new" />
      {showForm && (
        <ProfileForm
          fullName={fullName}
          setFullName={setFullName}
          photoUrl={photoUrl}
          setPhotoUrl={setPhotoUrl}
          setShowForm={setShowForm}
        />
      )}
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
      {loggingOut && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
