"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noHp, setNoHp] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const [noHpErrorMessage, setNoHpErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [classError, setClassError] = useState("");
  const [errorFieldEmpty, setErrorFieldEmpty] = useState("");

  const handleSubmit = async () => {
    try {
      if (
        firstName != "" &&
        lastName != "" &&
        email != "" &&
        kelas != "" &&
        password != "" &&
        username != "" &&
        noHp != ""
      ) {
        const response = await axios
          .post("http://localhost:3030/register", {
            firstName,
            lastName,
            email,
            kelas,
            password,
            username,
            noHp,
          })
          .then((response) => {
            console.log(response);
            setSuccessMessage("User added successfully!");
            setErrorMessage("");
            clearForm();
            window.location.href = "/Auth";
          })
          .catch((e) => {
            console.log("error :", e);
            if (e.response.data.response.error === true) {
              console.error(e.response.data.response.errorMessage);
              router.push("/register");
            }
          });
      } else {
        setErrorFieldEmpty("data cannot be empty");
      }
    } catch (error) {
      console.error("Error adding user: ", error);
      setErrorMessage("Failed to add user.");
      setSuccessMessage("");
    }
  };
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setKelas("");
    setUsername("");
    setPassword("");
    setNoHp("");
  };
  const handleClose = async () => {
    try {
      clearForm();
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (error) {
      console.error("Error Close adding user: ", error);
    }
  };
  const validatePassword = (value: string) => {
    console.log("Input ", value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\];',./]).{8,}$/;
    return passwordRegex.test(value);
  };
  const handlePasswordChange = (value: any) => {
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError(
        "Password harus minimal 8 karakter, kombinasi huruf kecil, huruf kapital, angka, dan simbol"
      );
    } else {
      setPasswordError("");
    }
  };
  const validateNoHp = (value: any) => {
    // Check if the value contains only numeric characters
    return /^\d+$/.test(value);
  };

  const alphanumeric = (value: any) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
  };
  const handleChangeClass = async (value: any) => {
    const input = value;
    console.log("input: ", input);
    setKelas(input);
    // Perform validation before submitting
    if (!alphanumeric(input)) {
      setClassError("Class can only contain letters and numbers.");
      return;
    } else {
      setClassError("");
      return;
    }
  };
  const handleChangeNoHP = async (value: any) => {
    const input = value;
    console.log("input: ", input);
    setNoHp(input);
    // Perform validation before submitting
    if (!validateNoHp(input)) {
      setNoHpErrorMessage("Phone number must contain only numeric characters.");
      return;
    } else {
      setNoHpErrorMessage("");
      return;
    }
  };
  const validateEmail = (input: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(input)) {
      setEmailError("Format email tidak valid (ex: name@mail.com)");
    } else {
      setEmailError("");
    }
  };
  const handleEmailChange = (event: any) => {
    const { value } = event;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-md w-full">
        <h2 className="text-2xl font-bold mb-4">Registrasi</h2>
        <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="First Name"
            />
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Last Name"
            />
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="example: name@gmail.com"
            />
            {emailError && (
              <p className="text-red-500 text-[10px]">{emailError}</p>
            )}
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => handleChangeClass(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Class Example: 12A"
            />
            {classError && (
              <p className="text-red-500 text-[10px]">{classError}</p>
            )}
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              No. Handphone
            </label>
            <p className="text-[10px] pb-0 text-gray-400">Example: 0812XXXX</p>
            <input
              type="text"
              value={noHp}
              onChange={(e) => handleChangeNoHP(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="No. Handphone"
            />
            {noHpErrorMessage && (
              <div className="text-red-500 mt-2">{noHpErrorMessage}</div>
            )}
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
        </div>
        <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Username"
            />
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => handlePasswordChange(e.target?.value)}
              className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Password"
            />
            {passwordError && (
              <p className="text-red-500 text-[10px]">{passwordError}</p>
            )}
            {errorFieldEmpty && (
              <p className="text-red-500 text-[10px]">{errorFieldEmpty}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add User
        </button>
        <button
          onClick={() => handleClose()}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;
