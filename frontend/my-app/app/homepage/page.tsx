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

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
    author: 'swabdesign',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
    author: 'Pavel Nekoranec',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
    author: 'Charles Deluvio',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
    author: 'Christian Mackie',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
    author: 'Darren Richardson',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
    author: 'Taylor Simpson',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
    author: 'Ben Kolde',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
    author: 'Philipp Berndt',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
    author: 'Jen P.',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
    author: 'Douglas Sheppard',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
    author: 'Fi Bell',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
    author: 'Hutomo Abrianto',
  },
];

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
          console.log('img : ', response.data.data)
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
          <Box sx={{height: 600, overflowY: "scroll", paddingLeft:4, paddingRight:4 }}>
            <ImageList variant="masonry" cols={4} gap={8}>
              {DataGaleriBerita?.map((item:any) => (
                <ImageListItem key={item.img.replace("%20", " ")}>
                  <img
                    srcSet={`${item.img.replace("%20", " ")}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img.replace("%20", " ")}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar position="below" title={item.author} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
