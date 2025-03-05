import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth-api-slice";
import toast from "react-hot-toast";

const Register = () => {
  const [message, setMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegisterData = async (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      toast.success("Registration successful", {
        duration: 2000,
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed");
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
          Create an Account
        </h2>
        <form
          onSubmit={handleRegister}
          className="space-y-4 max-w-sm"
          style={{ margin: "auto", paddingTop: "1.5rem" }}
        >
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleRegisterData}
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleRegisterData}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleRegisterData}
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
            className="w-full bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg shadow-md transition duration-300 cursor-pointer flex items-center justify-center "
            style={{ marginTop: "1rem", padding: "0.75rem" }}
          >
            {isLoading ? (
              <LiaSpinnerSolid className=" animate-ping" />
            ) : (
              "Register Now"
            )}
          </button>
        </form>
        <p
          className="italic text-sm text-center text-gray-600 mt-4"
          style={{ margin: "1rem 0" }}
        >
          Alredy an account ?{" "}
          <Link
            style={{ textDecoration: "underline" }}
            to="/login"
            className="text-red-500 "
          >
            Login
          </Link>{" "}
          here
        </p>
      </div>
    </section>
  );
};

export default Register;
