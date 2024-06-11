"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Gambar from "@/public/images/gambar-bg-1.jpg";
import Footer from "@/components/Footer";

export default function homepage() {
  const router = useRouter();
  const [DataGaleriBerita, setDataGaleriBerita] = useState([]);
  const [roleName, setRoleName] = useState("");
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
  const getAllDataGaleriBerita = async () => {
    try {
      axios
        .get("http://localhost:3030/summary-dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("img : ", response.data.data);
          setDataGaleriBerita(response.data.data);
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
    var x: any = localStorage.getItem("user");
    const userLocalStorage: any = JSON.parse(x);
    setRoleName(userLocalStorage?.name);
    getAllDataGaleriBerita();
  }, []);
  return (
    <main>
      <div>
        <Header />
        <div>
            {DataGaleriBerita.map((item:any) => (
              <div className="w-10 h-20">
                <img
                  src={`${item.img.replace("%20", " ")}`}
                  alt={item.title}
                  width={100} // Replace with the actual width of your image
                  height={200} // Replace with the actual height of your image
                />
              </div>
            ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
