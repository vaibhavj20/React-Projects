// import React, { useState, useEffect } from "react";
// import "../../styles/Expense.css";

// const ExpenseForm = ({ onAddExpense, expenseToEdit, onUpdateExpense }) => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     if (expenseToEdit) {
//       setAmount(expenseToEdit.amount);
//       setDescription(expenseToEdit.description);
//       setCategory(expenseToEdit.category);
//     }
//   }, [expenseToEdit]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const expense = {
//       id: expenseToEdit ? expenseToEdit.id : Date.now().toString(),
//       amount,
//       description,
//       category,
//     };
//     if (expenseToEdit) {
//       onUpdateExpense(expense);
//     } else {
//       onAddExpense(expense);
//     }
//     setAmount("");
//     setDescription("");
//     setCategory("");
//   };

//   return (
//     <div className="expense-form-container">
//       <h2 className="form-title">
//         {expenseToEdit ? "Edit Expense" : "Add Expense"}
//       </h2>
//       <form onSubmit={handleSubmit} className="expense-form">
//         <div className="form-group">
//           <label htmlFor="amount">Amount</label>
//           <input
//             id="amount"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <input
//             id="description"
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Choose Category
//             </option>
//             <option value="Food">Food</option>
//             <option value="Petrol">Petrol</option>
//             <option value="Salary">Salary</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <button type="submit" className="form-btn">
//           {expenseToEdit ? "Update Expense" : "Add Expense"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ExpenseForm;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseTable from "./ExpenseList";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../Store/ExpenseReducer";

function ExpenseForm() {
  const userId = useSelector((state) => state.authentication.userId);

  const dispatch = useDispatch();
  const history = useNavigate();
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const cateInputRef = useRef();
  const [showAlert, setShowAlert] = useState({ message: "", active: false });
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const editHandler = (id) => {
    history("/?id=" + id);
    setIsUpdate(true);
    axios
      .get(
        `https://expenses-b1357-default-rtdb.firebaseio.com/${userId}/${id}.json`
      )
      .then((res) => {
        priceInputRef.current.value = res.data.price;
        desInputRef.current.value = res.data.des;
        cateInputRef.current.value = res.data.cat;
      });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      const updateId = queryParams.get("id");

      await axios.put(
        `https://expenses-b1357-default-rtdb.firebaseio.com/${userId}/${updateId}.json`,
        {
          price: priceInputRef.current.value,
          des: desInputRef.current.value,
          cat: cateInputRef.current.value,
        }
      );

      setShowAlert({ message: "Updated SuccessFully", active: true });
      setIsUpdate(false);
      setTimeout(() => {
        setShowAlert({ message: "", active: false });

        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
        history("/");
      }, 2000);
    } else {
      const obj = {
        price: priceInputRef.current.value,
        des: desInputRef.current.value,
        cat: cateInputRef.current.value,
      };
      const data = await axios
        .post(
          `https://expenses-b1357-default-rtdb.firebaseio.com/${userId}.json`,
          obj
        )

        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (data) {
        dispatch(ExpenseSliceActions.newExpense(obj));
        setShowAlert({ message: "Expenses Added SuccessFully", active: true });
        setTimeout(() => {
          setShowAlert({ message: "", active: false });
        }, 2000);
        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      {showAlert.active && (
        <div className="alert alert-dark w-50 mx-auto" role="alert">
          {showAlert.message}
        </div>
      )}
      <Form
        className="w-50 mx-auto mb-3 bg-success bg-opacity-75"
        style={{ borderRadius: "24px" }}
        onSubmit={formHandler}
      >
        <div className="ps-3 pe-4">
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              ref={priceInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              required
              ref={desInputRef}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            required
            ref={cateInputRef}
          >
            <option>Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Grocery">Grocery</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
          </Form.Select>
          <Button
            type="submit"
            className="mb-3 w-100 btn-success bg-opacity-75 border-white"
          >
            {isUpdate ? "Update" : "Add Expense"}
          </Button>
        </div>
      </Form>
      <ExpenseTable editHandler={editHandler} isUpdate={isUpdate} />
    </div>
  );
}

export default ExpenseForm;
