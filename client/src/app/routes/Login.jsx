import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="form-container">
      <section className="heading">
        <h1>Days</h1>
        <p>“Write some shit down.”</p>
      </section>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={onChange}
        />
        <button type="submit" className="btn-special">
          Login
        </button>
      </form>
      <section className="subscript">
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </section>
    </div>
  );
}
