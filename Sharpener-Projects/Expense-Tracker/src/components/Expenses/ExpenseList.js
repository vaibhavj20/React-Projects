import React from "react";
import "../../styles/Expense.css"; // Import the updated CSS

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <span>
              {expense.description} - {expense.amount} ({expense.category})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
