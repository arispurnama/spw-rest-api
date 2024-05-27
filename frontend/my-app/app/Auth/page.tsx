'use client'
import React from 'react'
import { useState } from 'react';
import base from "@/service/baseService"
import baseService from '@/service/baseService';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState("");

  const login = async () => {
    try {
      axios
  .post('http://localhost:3030/login', {
    username: username,
    password: password,
  })
  .then(response => {
    console.log(response);
    localStorage.setItem("access_token", JSON.stringify(response.data.response.token));
    localStorage.setItem("user", JSON.stringify(response.data.response.data));
    window.location.href = '/';
  });
       
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoginError("Email atau Kata sandi yang kamu masukan salah.");
    }
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
              onChange={(e: any) => { setUsername(e.target.value); console.log(username) }}
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
              onChange={(e:any) => { setPassword(e.target.value); console.log(password) }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            onClick={()=>login()}
          >
            Log In
          </button>
      </div>
    </div>
  )
}
export default Login