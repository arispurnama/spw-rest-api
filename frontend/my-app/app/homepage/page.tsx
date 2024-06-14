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
import { stringify } from "querystring";
import { Pagination, TablePagination } from "@mui/material";

export default function homepage() {
  const router = useRouter();
  const [DataGaleriBerita, setDataGaleriBerita] = useState([]);
  const [roleName, setRoleName] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
          console.log("img", decodeURIComponent(response.data.data[0].img));
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
  const url = (value: string) => {
    const decoded = value.split(" ");
    let result = "";
    decoded.forEach((element) => {
      result += `${element} `;
    });
    console.log("split", result);
    return result;
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <main>
      <Header />
      <div className="md:h-[900px] sm:h-[500px] p-4 bg-gray-100">
        <div className="flex flex-row justify-evenly flex-wrap">
          {DataGaleriBerita?.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )?.map((row: any) => (
            <div className="w-80 rounded-md " key={row.id}>
              <Image
                className="rounded-md border-"
                src={`/uploads/${row.img}`}
                alt={row.title}
                width={900} // Replace with the actual width of your image
                height={600} // Replace with the actual height of your image
              />
              <h2 className="font-bold text-2xl">{row.title}</h2>
              <p className="text-xs">{row.author}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={DataGaleriBerita.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
