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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios
        .post("http://localhost:3030/register", {
          firstName,
          lastName,
          email,
          kelas,
          password,
          username,
        })
        .then((response) => {
          console.log(response);
          setSuccessMessage("User added successfully!");
          setErrorMessage("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setKelas("");
          setUsername("");
          setPassword("");
          window.location.href = "/Auth";
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.data.response.error === true) {
            console.error(e.response.data.response.errorMessage);
            router.push("/register");
          }
        });
    } catch (error) {
      console.error("Error adding user: ", error);
      setErrorMessage("Failed to add user.");
      setSuccessMessage("");
    }
  };

  const handleClose = async () => {
    try {
      setErrorMessage("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setKelas("");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (error) {
      console.error("Error Close adding user: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-md w-full">
        <h2 className="text-2xl font-bold mb-4">Registrasi</h2>
        <div className="flex flex-row gap-24">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-24">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <input
              type="text"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-24">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              No. Handphone
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-24">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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
