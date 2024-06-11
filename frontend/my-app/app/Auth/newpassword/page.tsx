"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import SnackBar from "@/components/SnackBar";
const newPassword = () => {
  const [password, setPassword] = useState("");
  const [confiPassword, setConfiPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confimPasswordError, setConfirmPasswordError] = useState("");
  const [otp, setOtp] = useState("");

  const validatePassword = (value: string) => {
    console.log("Input ", value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\];',./]).{8,}$/;
    return passwordRegex.test(value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event);
    console.log("event ", event);
    if (!validatePassword(event)) {
      setPasswordError(
        "Password harus minimal 8 karakter, kombinasi huruf kecil, huruf kapital, angka, dan simbol"
      );
    } else {
      setPasswordError("");
    }
  };
  const handleonfirmPassword = (event: any) => {
    setConfiPassword(event);
    if (event !== password) {
      setConfirmPasswordError("Password tidak sama dengan yang atas");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleResetPassword = () => {
    console.log("reser ");
    if (password && confiPassword && !passwordError && !confimPasswordError) {
      // Handle the password reset logic here
      try {
        localStorage.clear();
        axios
          .post(`http://localhost:3030/ubahPassword/${otp}`, {
            password: password,
          })
          .then((response) => {
            console.log(response);
            setErrorType("success");
            setErrorMessage(
              "Reset Password Berhasil " + response.data.response.errorMessage
            );
            setSnackBar(true);
            setTimeout(() => {}, 1000);
            window.location.href = "/Auth";
          })
          .catch((e) => {
            console.log("error :", e);
            if (e.response.status === 401) {
              setErrorType("error");
              setErrorMessage(
                "Authentication failed, username password salah!!"
              );
              setTimeout(() => {
                setSnackBar(true);
              }, 1000);
            } else if (e.response.status === 500) {
              setErrorType("error");
              setErrorMessage(
                "Reset Password Gagal " + e.response.data.errorMessage
              );
              setTimeout(() => {
                setSnackBar(true);
              }, 1000);
            }
          });
      } catch (error) {
        console.error("Error fetching products: ", error);
        setErrorType("error");
        setErrorMessage("Email yang kamu masukan salah.");
      }
      console.log("Password reset successfully");
      setSnackBar(true);
    } else {
      setErrorMessage("Please fix the errors before submitting.");
      setErrorType("error");
      setTimeout(() => {
        setSnackBar(true);
      }, 1000);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
          <div className="mb-4 text-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/lock--v1.png"
              alt="Lock icon"
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">Reset Password?</h2>
          </div>
          <div className="mb-4">
            <label>New Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-[10px]">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label>Confirm New Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm assword"
              onChange={(e) => handleonfirmPassword(e.target.value)}
            />
            {confimPasswordError && (
              <p className="text-red-500 text-[10px]">{confimPasswordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label>OTP</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Otp"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="button"
              onClick={() => handleResetPassword()}
            >
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="border-t w-full"></span>
            <span className="text-gray-500 mx-4">OR</span>
            <span className="border-t w-full"></span>
          </div>
          <div className="text-center mt-4">
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/Auth"
            >
              Back to login
            </Link>
          </div>
        </div>
        <SnackBar
          isOpen={showSnackBar}
          message={errorMessage}
          type={errorType}
          duration={5000}
          onClose={() => setSnackBar(false)}
        />
      </div>
    </>
  );
};

export default newPassword;
