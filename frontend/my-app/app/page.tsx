'use client'
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Head from 'next/head'
import Image from 'next/image'

import Gambar from "@/public/images/gambar-bg-1.jpg";
import Footer from "@/components/Footer";
export default function Home() {
  const router = useRouter()

  return (
    <main>
        <div >
          <Header />
          <div className="relative min-h-screen flex flex-col items-center justify-center bg-teal-100">
            <Image
              src={Gambar}
              alt="Picture of the author"
              className="blur-sm h-screen"
            />
            <h6 className="absolute z-20 left-10 top-[30%] text-4xl text-white font-bold">SEKOLAH PENCETAK WIRAUSAHA</h6>
            <div className="absolute z-20 left-10 top-[35%] text-white font-bold max-w-[60%]">
            Selamat Datang di Aplikasi SI JAGOAN ( Siswaku Jago Berjualan ) Program Sekolah Pencetak Wirausaha ( SPW ) SMKN SPP Tasikmalaya
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
    </main>
  );
}
