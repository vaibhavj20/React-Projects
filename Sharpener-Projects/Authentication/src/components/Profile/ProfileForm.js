// import classes from "./ProfileForm.module.css";
// import { useContext, useRef } from "react";
// import AuthContext from "../../store/auth-context";
// import { useHistory } from "react-router-dom";

// const ProfileForm = () => {
//   const history = useHistory();
//   const newPasswordTnputRef = useRef();
//   const authCtx = useContext(AuthContext);
//   const submitHandler = (event) => {
//     event.preventDefault();
//     const entredNewPassword = newPasswordTnputRef.current.value;

//     fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-ST5yXnOyqZOwkiyy8z3gggETofw6w_I",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           idToken: authCtx.token,
//           password: entredNewPassword,
//           returnSecureToken: false,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     ).then((res) => {
//       history.replace("/");
//     });
//   };
//   return (
//     <form className={classes.form} onSubmit={submitHandler}>
//       <div className={classes.control}>
//         <label htmlFor="new-password">New Password</label>
//         <input type="password" id="new-password" minLength="7" />
//       </div>
//       <div className={classes.action}>
//         <button>Change Password</button>
//       </div>
//     </form>
//   );
// };

// export default ProfileForm;

import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-ST5yXnOyqZOwkiyy8z3gggETofw6w_I",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
