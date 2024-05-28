'use client'
import React, { useState } from "react";
import axios from "axios";
import AddUserForm from "@/components/userform/AddUserForm";

const Register = async () => {
  return(
    <main>
      <AddUserForm />
    </main>
  );
};

export default Register;
