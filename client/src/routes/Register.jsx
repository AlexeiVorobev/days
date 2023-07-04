import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import LoadingScreen from "../components/LoadingScreen";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const { email, password } = formData;

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
    dispatch(register(userData));
  };

  return (
    <div>
      {isLoading ? (
        <LoadingScreen message={"Creating Account"} />
      ) : (
        <div className="form-container">
          <section className="heading">
            <h1>Days</h1>
            <p>Sign-up now and start writing</p>
          </section>
          <form onSubmit={onSubmit}>
            <input
              style={{ width: "100%" }}
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
            <input
              style={{ width: "100%" }}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
            />
            <button type="submit" className="btn-special">
              Sign-up
            </button>
          </form>
          <section className="subscript">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </section>
        </div>
      )}
    </div>
  );
}
