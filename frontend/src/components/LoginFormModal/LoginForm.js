import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemo = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.thunk_loginDemo({credential:"Demo-lition",password:"password"}))
  }

  return (
    <div className="loginContainer">
    
      <form className="Form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className='errors' key={idx}>{error}</li>
          ))}
        </ul>
        <div className="container"></div>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="loginButton" type="submit">Log In</button>
      </form>
      <form className="demoForm" onSubmit={handleDemo}>
            <input type="hidden" name="username" value="Demo-lition"></input>
            <input type="hidden" name="password" value="password"></input>
            <button className="loginButton" type="submit">Log in as Demo User</button>
      </form>
    </div>

  );
}

export default LoginForm;