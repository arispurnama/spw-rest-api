"use client";
import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [modal, setModal] = useState("");
  const [omzet, setOmzet] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noHp, setNoHp] = useState("");
  const [fullName, setFullName] = useState("");

  let token = null;
  try {
    token = localStorage.access_token
      ? JSON.parse(localStorage.access_token)
      : null;
  } catch (e) {
    console.error("Error parsing token from localStorage:", e);
  }
  let user = null;
  try {
    user = localStorage.user ? JSON.parse(localStorage.user) : null;
    //console.log("user for header", user);
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }
  const getDataOmzetModal = async () => {
    try {
      axios
        .get(`http://localhost:3030/total-modal-omzet/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("role name : ", response.data.data[0].jumlahmodal);
          setModal(response.data.data[0].jumlahmodal);
          setOmzet(response.data.data[0].jumlahomzet);
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            console.error("Unauthorized access - perhaps you need to log in?");
            router.push("/Auth");
          }
        });
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };
  const getUserid = async () => {
    try {
      axios
        .get(`http://localhost:3030/user/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("user name : ", response.data.response.data);
          setUsername(response.data.response.data.username);
          setFirstName(response.data.response.data.firstName);
          setLastName(response.data.response.data.lastName);
          setFullName(response.data.response.data.fullName);
          setNoHp(response.data.response.data.noHp);
          setKelas(response.data.response.data.kelas);
          setEmail(response.data.response.data.email);
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            console.error("Unauthorized access - perhaps you need to log in?");
            router.push("/Auth");
          }
        });
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };
  useEffect(() => {
    getDataOmzetModal();
    getUserid();
  }, []);
  return (
    <main>
      <div>
        <Header />
      </div>
      <div className="m-3 pr-2 pl-2">
        <h2 className="text-3xl font-semibold mb-4">Profile</h2>
      </div>
      <div className="m-3 pr-2 pl-2">
        <div className="flex space-x-4">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-4 text-center">
            {/* <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5v14h14V5H5zm7 2.586l2.828 2.829-1.415 1.414-1.414-1.414-1.415 1.414L9.172 10.415 12 7.586z"
                ></path>
              </svg>
            </div> */}
            <p className="text-2xl font-bold text-gray-900">
              Rp. {parseFloat(omzet)}
            </p>
            <p className="text-sm text-gray-500">OMZET</p>
          </div>
          <div className="flex-1 bg-white shadow-lg rounded-lg p-4 text-center">
            {/* <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              
            </div> */}
            <p className="text-2xl font-bold text-gray-900">Rp. {modal}</p>
            <p className="text-sm text-gray-500">MODAL</p>
          </div>
        </div>
      </div>
      <div className="m-3 pr-2 pl-2">
        <div className="flex flex-row justify-end items-center">
          <Link href={"/profilePage/gantipassword"} className="flex flex-row justify-center bg-red-400 rounded-md w-40 h-9 text-center items-center">
            Ganti Password
          </Link>
        </div>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            First Name
          </span>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Last Name
          </span>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Full Name
          </span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            No. Handphone
          </span>
          <input
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Class</span>
          <input
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>

        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update profile
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
