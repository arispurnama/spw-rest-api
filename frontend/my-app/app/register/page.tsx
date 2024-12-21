"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "@/components/userform/AddUserForm";

const Register = () => {
  const [dataAdmin, setDataAdmin] = useState([]);
  const [error, setError] = useState(null);

  const getDataAdminAll = async () => {
    try {
      axios
        .get("http://localhost:3030/admin/option", {})
        .then((response) => {
          console.log("response get all user :", response);
          setDataAdmin(response.data.data);
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            console.error("Unauthorized access - perhaps you need to log in?");
            
          }
        });
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    getDataAdminAll();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <AddUserForm userDataAdmin={dataAdmin} />
    </main>
  );
};

export default Register;
