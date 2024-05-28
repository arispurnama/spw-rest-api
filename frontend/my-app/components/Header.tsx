"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import logoSekolah from "@/public/images/logo-sekolah-removebg-preview.png";
import logoSpw from "@/public/images/logo-spw-removebg-preview.png";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  let user = null;
  try {
    user = localStorage.user ? JSON.parse(localStorage.user) : null;
    console.log("user for header", user);
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }
  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      router.push("/Auth");
    }, 200);
  };

  return (
    <header className="min-h-28 bg-teal-900 text-white z-50 w-full top-0 sticky flex flex-row">
      <div className="container flex justify-between py-4 px-6">
        <div>
          <div className="flex flex-row gap-4 items-center">
            <div className="p-0 max-w-20 max-h-5">
              <Image src={logoSekolah} alt="Picture of the author" />
            </div>
            <div className="p-0 max-w-40 max-h-1">
              <Image src={logoSpw} alt="Picture of the author"/>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          {user?.id ? (
            <>
              <div className="px-7 py-2 hover:bg-white hover:rounded-full hover:px-7 hover:py-2 hover:text-black">
                <button>Statistics</button>
              </div>
              <div className="px-7 py-2 hover:bg-white hover:rounded-full hover:px-7 hover:py-2 hover:text-black">
                <button onClick={() => router.push("/laporanomzet")}>Laporan Omzet</button>
              </div>
              <div className="px-7 py-2 hover:bg-white hover:rounded-full hover:px-7 hover:py-2 hover:text-black">
                <button>Galeri dan Berita</button>
              </div>
              <div className="px-7 py-2 hover:bg-white hover:rounded-full hover:px-7 hover:py-2 hover:text-black">
                <button onClick={() => router.push("/produksiswa")}>Produk Siswa</button>
              </div>
              <div className="px-7 py-2 hover:bg-white hover:rounded-full hover:px-7 hover:py-2 hover:text-black">
                <button onClick={() => router.push("/datauser")}>
                  Data User
                </button>
              </div>
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none hover:cursor-pointer"
                >
                  <svg
                    className="w-8 h-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="#">Profile</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <button onClick={() => logout()}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
              {/* <p className='font-bold text-white text-xl'>{user?.firstName}</p>
                        <button onClick={() => logout()} className='bg-green-950 py-2 px-7 rounded-full hover:bg-green-600'>Logout</button> */}
            </>
          ) : (
            <>
              <div>
                <button
                // onClick={() => window.scrollTo(0, 500)}
                >
                  About
                </button>
              </div>
              <div>
                <button>Contact</button>
              </div>
              <div>
                <button
                  onClick={() => router.push("/Auth")}
                  className="bg-green-950 py-2 px-7 rounded-full hover:bg-green-600"
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-green-950 py-2 px-7 rounded-full hover:bg-green-600"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>

        {/* <div className={`flex flex-row gap-2 items-center ${isOpen ? 'block' : 'hiddden'}`}>
                    {/* <div className="text-2xl font-bold">
                            DJAGOAN
                    </div>}
                    <div>
                        <button onClick={() => window.scrollTo(0, 500)}>
                            About
                        </button>
                    </div>
                    <div>
                        <button>
                            Contact
                        </button>
                    </div>
                    <div>
                        <button onClick={() => router.push('/Auth')} className='bg-green-950 py-2 px-7 rounded-full hover:bg-green-600'>Login</button>
                    </div>
                    <div>
                        <Link href="/signup"><button className='bg-green-950 py-2 px-7 rounded-full hover:bg-green-600'>Sign Up</button></Link>
                    </div>
                </div>  */}
      </div>
    </header>
  );
};

export default Header;
