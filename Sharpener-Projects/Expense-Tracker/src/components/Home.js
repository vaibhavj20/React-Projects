import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get, remove, set } from "firebase/database";
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
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmailVerified(user.emailVerified);
        setShowVerifyButton(!user.emailVerified);
        fetchProfileData(user.uid);
        fetchExpenses();
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

  const fetchExpenses = async () => {
    try {
      const snapshot = await get(ref(database, "expenses"));
      if (snapshot.exists()) {
        const expensesData = snapshot.val();
        const expensesList = Object.keys(expensesData).map((key) => ({
          id: key,
          ...expensesData[key],
        }));
        setExpenses(expensesList);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const newExpenseRef = ref(database, `expenses/${newExpense.id}`);
      await set(newExpenseRef, newExpense);
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      await set(ref(database, `expenses/${updatedExpense.id}`), updatedExpense);
      console.log("Expense successfully updated");
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
      setExpenseToEdit(null); // Clear the edit state after update
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await remove(ref(database, `expenses/${id}`));
      console.log("Expense successfully deleted");
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
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

  const handleCompleteClick = () => {
    setShowForm(true);
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
      <ExpenseForm
        onAddExpense={handleAddExpense}
        expenseToEdit={expenseToEdit}
        onUpdateExpense={handleUpdateExpense}
      />
      <ExpenseList
        expenses={expenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />
      {loggingOut && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
