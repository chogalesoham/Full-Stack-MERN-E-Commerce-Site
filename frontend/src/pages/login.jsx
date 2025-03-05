import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth-api-slice";
import toast from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";

const Login = () => {
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLoginData = async (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      toast.success("Login successful", {
        duration: 2000,
        position: "top-right",
      });
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error.message);
      setMessage("Please Provide valid User Info !");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div
        className="max-w-sm border border-gray-300 shadow-lg bg-white rounded-lg "
        style={{ margin: "15px", padding: "2rem" }}
      >
        <h2
          className="text-2xl font-semibold text-center text-gray-800"
          style={{ paddingTop: "1.25rem" }}
        >
          Please Login
        </h2>
        <form
          onSubmit={handleLogin}
          className="space-y-4 max-w-sm"
          style={{ margin: "auto", paddingTop: "1.5rem" }}
        >
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleLoginData}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleLoginData}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          {message && (
            <p className="text-red-500 text-sm text-center">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg shadow-md transition duration-300 cursor-pointer flex items-center justify-center"
            style={{ marginTop: "1rem", padding: "0.75rem" }}
          >
            {isLoading ? (
              <LiaSpinnerSolid className=" animate-ping" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p
          className="italic text-sm text-center text-gray-600 mt-4"
          style={{ margin: "1rem 0" }}
        >
          Don't have an account ?{" "}
          <Link
            style={{ textDecoration: "underline" }}
            to="/register"
            className="text-red-500 "
          >
            Register
          </Link>{" "}
          here
        </p>
      </div>
    </section>
  );
};

export default Login;
