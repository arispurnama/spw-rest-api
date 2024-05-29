"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SnackBar from "../SnackBar";

//library
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  isOpen: boolean;
  id: string;
  laporanDataEdit: any;
  userData: any;
  onClosed: () => void;
};

const EditLaporanOmzetForm = ({
  isOpen,
  id,
  laporanDataEdit,
  userData = [],
  onClosed,
}: Props) => {

  let renderMenuItems;
  
  if (!isOpen) {
    return null;
  } else {
    console.log("edit laporan : ", laporanDataEdit);
    const [omzet, setOmzet] = useState(laporanDataEdit?.jumlahOmzet);
    const [modal, setModal] = useState(laporanDataEdit?.JumlahModal);
    const [keterangan, setKeterangan] = useState(laporanDataEdit?.keterangan);
    const [tanggal, setTanggal] = useState();
    const [buktiTransaksi, setBuktiTransaksi] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [errorType, setErrorType] = useState("");
    const [showSnackBar, setSnackBar] = useState(false);
    const [userIdState, setUserIdState] = useState(laporanDataEdit?.userId);
    //localstorage
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
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
    const handlerSubmit = async () => {
      try {
        if (user?.name != "Admin") {
          const userId = user?.id;
          const payload = {
            userId: userId,
            jumlahOmzet: omzet,
            JumlahModal: modal,
            keterangan: keterangan,
            tanggalLaporan: tanggal,
            buktiTransaksi: buktiTransaksi,
          };
          console.log("payload lap : ", payload);
          axios
            .patch(`http://localhost:3030/laporan-omzet/${id}`, payload, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Add your token or any other header here
              },
            })
            .then((response) => {
              setErrorType("success");
              setErrorMessage(
                "Update Data Laporan " + response.data.response.errorMessage
              );
              setSnackBar(true);
              setTimeout(() => {
                onClosed();
                window.location.reload();
              }, 1000);
            })
            .catch((e) => {
              console.log("error :", e);
              if (e.response.status === 401) {
                console.error(
                  "Unauthorized access - perhaps you need to log in?"
                );
                setErrorType("error");
                setErrorMessage(
                  "Unauthorized access - perhaps you need to log in?"
                );
                setTimeout(() => {
                  setSnackBar(true);
                  router.push("/Auth");
                }, 1000);
              } else if (e.response.status === 500) {
                setErrorType("error");
                setErrorMessage(
                  "Data Gagal diUpdate " + e.response.data.errorMessage
                );
                setTimeout(() => {
                  setSnackBar(true);
                }, 1000);
              }
            });
        } else {
          const userId = userIdState;
          const payload = {
            userId: userId,
            jumlahOmzet: omzet,
            JumlahModal: modal,
            keterangan: keterangan,
            tanggalLaporan: tanggal,
            buktiTransaksi: buktiTransaksi,
          };
          console.log("payload lap : ", payload);
          axios
            .patch(`http://localhost:3030/laporan-omzet/${id}`, payload, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Add your token or any other header here
              },
            })
            .then((response) => {
              setErrorType("success");
              setErrorMessage(
                "Update Data Laporan " + response.data.response.errorMessage
              );
              setSnackBar(true);
              setTimeout(() => {
                onClosed();
                window.location.reload();
              }, 1000);
            })
            .catch((e) => {
              console.log("error :", e);
              if (e.response.status === 401) {
                console.error(
                  "Unauthorized access - perhaps you need to log in?"
                );
                setErrorType("error");
                setErrorMessage(
                  "Unauthorized access - perhaps you need to log in?"
                );
                setTimeout(() => {
                  setSnackBar(true);
                  router.push("/Auth");
                }, 1000);
              } else if (e.response.status === 500) {
                setErrorType("error");
                setErrorMessage(
                  "Data Gagal diUpdate " + e.response.data.errorMessage
                );
                setTimeout(() => {
                  setSnackBar(true);
                }, 1000);
              }
            });
        }
      } catch (error) {
        console.error("Error fetching laporan: ", error);
      }
    };

    const handleChange = (event: SelectChangeEvent) => {
      setUserIdState(event.target.value as string);
    };
    renderMenuItems = () => {
      console.log("user data :hbjsdhsdhfsdkbfd ", userData);
      const adminItems = (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex items-center justify-center bg-gray-100">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-md w-full">
                <h2 className="text-2xl font-bold mb-4">Edit Laporan</h2>
                <div className="flex flex-row gap-24">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Siswa
                    </label>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={userIdState}
                      onChange={handleChange}
                      label="Name"
                      className="w-72"
                    >
                      {userData?.map((name: any) => (
                        <MenuItem key={name.id} value={name.id}>
                          {name.firstName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Omzet
                    </label>
                    <input
                      type="text"
                      value={omzet}
                      onChange={(e) => setOmzet(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Modal
                    </label>
                    <input
                      type="text"
                      value={modal}
                      onChange={(e) => setModal(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal Pelaporan
                    </label>
                    <input
                      type="date"
                      value={tanggal}
                      onChange={(e: any) => setTanggal(e.target.value)}
                      className="mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Bukti Transaki
                    </label>
                    <input
                      type="file"
                      value={buktiTransaksi}
                      onChange={(e) => setBuktiTransaksi(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlerSubmit()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add Laporan
                </button>
                <button
                  onClick={onClosed}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
              </div>
            </div>{" "}
            <SnackBar
              isOpen={showSnackBar}
              message={errorMessage}
              type={errorType}
              duration={5000}
              onClose={() => setSnackBar(false)}
            />
          </div>
        </>
      );
      const userItem = (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex items-center justify-center bg-gray-100">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-md w-full">
                <h2 className="text-2xl font-bold mb-4">Edit Laporan</h2>
                <div className="flex flex-row gap-24">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Omzet
                    </label>
                    <input
                      type="text"
                      value={omzet}
                      onChange={(e) => setOmzet(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Modal
                    </label>
                    <input
                      type="text"
                      value={modal}
                      onChange={(e) => setModal(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-24">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal Pelaporan
                    </label>
                    <input
                      type="date"
                      value={tanggal}
                      onChange={(e: any) => setTanggal(e.target.value)}
                      className="mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Bukti Transaki
                    </label>
                    <input
                      type="file"
                      value={buktiTransaksi}
                      onChange={(e) => setBuktiTransaksi(e.target.value)}
                      className="ps-2 mt-1 block w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlerSubmit()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add Laporan
                </button>
                <button
                  onClick={onClosed}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
              </div>
            </div>{" "}
            <SnackBar
              isOpen={showSnackBar}
              message={errorMessage}
              type={errorType}
              duration={5000}
              onClose={() => setSnackBar(false)}
            />
          </div>
        </>
      );
      let roleBasedItems;
      switch (user.name) {
        case "Admin":
          roleBasedItems = adminItems;
          break;
        case "User":
          roleBasedItems = userItem;
          break;
        default:
          roleBasedItems = null;
      }
      return <>{roleBasedItems}</>;
    };
  }
  return <>{renderMenuItems()}</>;
};

export default EditLaporanOmzetForm;
