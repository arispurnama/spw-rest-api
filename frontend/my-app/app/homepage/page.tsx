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
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  TablePagination,
} from "@mui/material";

export default function homepage() {
  const router = useRouter();
  const [DataGaleriBerita, setDataGaleriBerita] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getAllDataGaleriBerita();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getAllDataGaleriBerita();
  };
  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getAllDataGaleriBerita();
  };
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
          params: {
            page: -1, // ganti dengan nilai yang sesuai
            size: -1, // ganti dengan nilai yang sesuai
            search: searchQuery,
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
  }, [searchQuery]);
  const url = (value: string) => {
    const decoded = value.split(" ");
    let result = "";
    decoded.forEach((element) => {
      result += `${element} `;
    });
    console.log("split", result);
    return result;
  };

  return (
    <main>
      <Header />
      <div className="h-screen p-4 bg-gray-200">
      <div className="pt-3">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
        <div className="flex flex-row justify-end pb-4">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="rounded-md ps-4 w-96 h-8 block border-black"
              onChange={(e: any) => {
                handleSearchChange(e.target.value);
                console.log(searchQuery);
              }}
            />
          </div>
        </div>
        <Box sx={{ width: 1500, height: 650, overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {DataGaleriBerita?.map((item: any) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`/uploads/${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`/uploads/${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar position="below" title={item.author} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
      {/* <TablePagination
        component="div"
        count={DataGaleriBerita.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <div>
        <Footer />
      </div>
    </main>
  );
}
