import React, { useState } from "react";
import "./../../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { Loading, handleLogin } = useAuth();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
   await handleLogin({ email: Email, password: Password });
    navigate("/");
    setEmail("");
    setPassword("");
  };

  if(Loading){
    return(
      <main>
        <h1>
          Loading......
        </h1>
        </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account?<Link to={"/registor"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
