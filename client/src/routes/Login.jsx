import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import LoadingScreen from "../components/LoadingScreen";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div>
      {isLoading ? (
        <LoadingScreen message="Logging In, please wait" />
      ) : (
        <div className="form-container">
          <section className="heading">
            <h1>Days</h1>
            <p>Write some stuff</p>
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
      )}
    </div>
  );
}
