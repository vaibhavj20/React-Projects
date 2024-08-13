import React from "react";
import "../../styles/Expense.css"; // Import the updated CSS

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Expense List</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-info">
              <span className="expense-description">{expense.description}</span>
              <span className="expense-amount">Rs. {expense.amount}</span>
              <span className="expense-category">{expense.category}</span>
            </div>
            <div className="expense-actions">
              <button
                className="edit-btn"
                onClick={() => onEditExpense(expense)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
