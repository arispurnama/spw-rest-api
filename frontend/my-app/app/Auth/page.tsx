"use client";
import React from "react";
import { useState } from "react";
import base from "@/service/baseService";
import baseService from "@/service/baseService";
import axios from "axios";
import SnackBar from "@/components/SnackBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const login = async () => {
    try {
      localStorage.clear();
      axios
        .post("http://localhost:3030/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data.response.token)
          );
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.response.data)
          );
          setErrorType("success");
          setErrorMessage(
            "Tambah Data Galeri Berita " + response.data.response.errorMessage
          );
          setSnackBar(true);
          setTimeout(() => {}, 1000);
          window.location.href = "/homepage";
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            setErrorType("error");
            setErrorMessage("Authentication failed, username password salah!!");
            setTimeout(() => {
              setSnackBar(true);
            }, 1000);
          } else if (e.response.status === 500) {
            setErrorType("error");
            setErrorMessage("Login Gagal " + e.response.data.errorMessage);
            setTimeout(() => {
              setSnackBar(true);
            }, 1000);
          }
        });
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoginError("Email atau Kata sandi yang kamu masukan salah.");
    }
  };
  // const validatePassword = (input: any) => {
  //   const passwordRegex =
  //     /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*()_+{}|:"<>?`\-=[\];',./]).{8,}$/;

  //   if (!passwordRegex.test(input)) {
  //     setPasswordError(
  //       "Password harus minimal 8 karakter, kombinasi huruf kecil, huruf kapital, angka, dan simbol"
  //     );
  //   } else {
  //     setPasswordError("");
  //   }
  // };
  const validatePassword = (input: string) => {
    const passwordRegex =
      /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*()_+{}|:"<>?`\-=[\];',./]).{8,}$/;
    setPasswordError(
      !passwordRegex.test(input)
        ? "Password harus minimal 8 karakter, kombinasi huruf kecil, huruf kapital, angka, dan simbol"
        : ""
    );
  };
  const handlePasswordChange = (event: any) => {
    const { value } = event?.target;
    setPassword(value);
    validatePassword(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <p className="mb-6 text-center text-gray-600">
          Enter your username and password to log in.
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={username}
            onChange={(e: any) => {
              setUsername(e.target.value);
              console.log(username);
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e: any) => {
              handlePasswordChange(e);
              console.log(password);
            }}
          />
          {passwordError ? (
            <p className="text-[#D22826] text-xs font-medium">
              {passwordError}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          onClick={() => login()}
        >
          Log In
        </button>
      </div>
      <SnackBar
        isOpen={showSnackBar}
        message={errorMessage}
        type={errorType}
        duration={5000}
        onClose={() => setSnackBar(false)}
      />
    </div>
  );
};
export default Login;
