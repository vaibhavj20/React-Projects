import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../../auth/firebase";
import "../../styles/Expense.css";

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
      date: new Date().toLocaleString(),
    };

    try {
      // Push the new expense to Firebase Realtime Database
      const expenseRef = await push(ref(database, "expenses"), expenseData);
      console.log("Expense saved successfully");

      // Optionally clear the form after submission
      setAmount("");
      setDescription("");
      setCategory("Food");

      // Call the parent component's function to add the expense
      onAddExpense({
        id: expenseRef.key, // Use the key of the new expense
        ...expenseData,
      });
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  return (
    <div className="expense-form-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
