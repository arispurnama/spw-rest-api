"use client";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";

import Gambar from "@/public/images/sekolah.jpeg";
import Footer from "@/components/Footer";
export default function Home() {
  const router = useRouter();

  return (
    <main>
      <div>
        <Header />
        <div className="relative md:h-screen sm:h-[600px] flex flex-col justify-around bg-teal-100">
          <Image
            src={Gambar}
            alt="Picture of the author"
            className="blur-sm md:h-screen sm:h-[600px]"
          />
          <h6 className="absolute text-white font-bold z-10 left-2 top-5 sm:left-2 sm:top-5 sm:text-2xl md:left-10 md:top-[30%] md:text-4xl">
            SEKOLAH PENCETAK WIRAUSAHA
          </h6>
          <div className="absolute text-white font-bold z-10 left-2 top-10 sm:left-2 sm:top-10 sm:max-w-[70%] md:left-10 md:top-[35%] md:max-w-[60%]">
            Selamat Datang di Aplikasi SI JAGOAN ( Siswaku Jago Berjualan )
            Program Sekolah Pencetak Wirausaha ( SPW ) SMKN SPP Tasikmalaya
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
