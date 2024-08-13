import React, { useState, useEffect } from "react";
import "../../styles/Expense.css";

const ExpenseForm = ({ onAddExpense, expenseToEdit, onUpdateExpense }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: expenseToEdit ? expenseToEdit.id : Date.now().toString(),
      amount,
      description,
      category,
    };
    if (expenseToEdit) {
      onUpdateExpense(expense);
    } else {
      onAddExpense(expense);
    }
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="expense-form-container">
      <h2 className="form-title">
        {expenseToEdit ? "Edit Expense" : "Add Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose Category
            </option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="form-btn">
          {expenseToEdit ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
