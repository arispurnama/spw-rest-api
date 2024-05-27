import React, { useState } from "react";
import axios from "axios";
import { tree } from "next/dist/build/templates/app-page";

const AddUserForm = ( onUserAdded:any, onClose:any ) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [kelas, setKelas] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.user ? JSON.parse(localStorage.access_token) : null;

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3030/user",
        {
          firstName,
          lastName,
          email,
          kelas,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("User added successfully!");
      setErrorMessage("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setKelas("");
      setRole("");
      onUserAdded(); // Notify parent component to refresh the user list
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding user: ", error);
      setErrorMessage("Failed to add user.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${onUserAdded.value ? true : "hidden"}`}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kelas</label>
          <input
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md">Close</button>
    </div>
  );
};

export default AddUserForm;
