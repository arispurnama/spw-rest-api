"use client";
import { Head } from "next/document";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import base from "@/service/baseService";
import baseService from "@/service/baseService";
import axios from "axios";
import SnackBar from "@/components/SnackBar";
const forgotPassword = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);
  const SendUsername = async () => {
    try {
      localStorage.clear();
      axios
        .post(`http://localhost:3030/CheckUsername/${username}`,{})
        .then((response) => {
          console.log(response);
          setErrorType("success");
          setErrorMessage(
            "Username Berhasil Dikirim" + response.data.response.errorMessage
          );
          setSnackBar(true);
          setTimeout(() => {}, 1000);
          window.location.href = "/Auth/newpassword";
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
            setErrorMessage("Username salah " + e.response.data.errorMessage);
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
            <h2 className="text-xl font-semibold">Trouble logging in?</h2>
            <p className="text-gray-600 text-sm">
              Enter your username and we'll send you a link to get back into
              your account.
            </p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="button"
              onClick={() => SendUsername()}
            >
              Send
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
          <SnackBar
            isOpen={showSnackBar}
            message={errorMessage}
            type={errorType}
            duration={5000}
            onClose={() => setSnackBar(false)}
          />
        </div>
      </div>
    </>
  );
};

export default forgotPassword;
