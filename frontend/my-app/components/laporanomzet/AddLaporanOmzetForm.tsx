"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SnackBar from "../SnackBar";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

//library
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { blob } from "stream/consumers";

type Props = {
  isOpen: boolean;
  userData: any;
  onClosed: () => void;
};

const AddLaporanOmzetForm = ({ isOpen, userData = [], onClosed }: Props) => {
  const [omzet, setOmzet] = useState("");
  const [modal, setModal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState();
  const [buktiTransaksi, setBuktiTransaksi] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [errorType, setErrorType] = useState("");
  const [showSnackBar, setSnackBar] = useState(false);
  const [userIdState, setUserIdState] = useState("");
  const [laporanMinggu, setLaporanMinggu] = useState("");
  const [errorOmzet, setErrorOmzet] = useState("");
  const [errorModal, setErrorModal] = useState("");
  const [errorFieldEmpty, setErrorFieldEmpty] = useState("");

  if (!isOpen) return null;

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
      const userId = user?.name != "Admin" ? user?.id : userIdState;

      //post file
      let payloadFormData = new FormData();
      if (
        buktiTransaksi != null &&
        omzet != "" &&
        modal != "" &&
        tanggal != "" &&
        laporanMinggu != ""
      ) {
        payloadFormData.append("file", buktiTransaksi);
        axios
          .post("http://localhost:3030/upload", payloadFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Add your token or any other header here
            },
          })
          .then((response) => {
            console.log("response upload : ", response.data.response.data);
            //post laporan
            const payload = {
              userId: userId,
              jumlahOmzet: omzet,
              JumlahModal: modal,
              keterangan: keterangan,
              tanggalLaporan: tanggal,
              buktiTransaksi: response.data.response.data,
              laporanMingguan: laporanMinggu,
            };
            axios
              .post("http://localhost:3030/laporan-omzet", payload, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Add your token or any other header here
                },
              })
              .then((response) => {
                setErrorType("success");
                setErrorMessage(
                  "Tambah Data Laporan " + response.data.response.errorMessage
                );
                setSnackBar(true);
                setTimeout(() => {
                  onClosed();
                  //window.location.href("/laporanomzet").reload();
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
                    "Data Gagal diTambah " + e.response.data.errorMessage
                  );
                  setTimeout(() => {
                    setSnackBar(true);
                  }, 1000);
                }
              });
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
                "Data Gagal diTambah " + e.response.data.errorMessage
              );
              setTimeout(() => {
                setSnackBar(true);
              }, 1000);
            }
          });
      } else {
        setErrorFieldEmpty("data cannot be empty");
      }
    } catch (error) {
      console.error("Error fetching laporan: ", error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUserIdState(event.target.value as string);
  };
  const handleChangeLaporanMingguan = (event: SelectChangeEvent) => {
    setLaporanMinggu(event.target.value as string);
  };

  const handleChangeFile = async (e: any) => {
    const fileInput = e.target.files[0];
    setBuktiTransaksi(fileInput);
  };
  const validateAngkaOnly = (value: any) => {
    // Check if the value contains only numeric characters
    return /^\d+$/.test(value);
  };
  const handleChangeOmzet = async (value: any) => {
    const input = value;
    console.log("input: ", input);
    // Perform validation before submitting
    if (!validateAngkaOnly(input)) {
      setErrorOmzet("Omzet must contain only numeric characters.");
      return;
    } else {
      setOmzet(input);
      setErrorOmzet("");
      return;
    }
  };
  const handleChangeModal = async (value: any) => {
    const input = value;
    console.log("input: ", input);
    // Perform validation before submitting
    if (!validateAngkaOnly(input)) {
      setErrorModal("Omzet must contain only numeric characters.");
      return;
    } else {
      setModal(input);
      setErrorModal("");
      return;
    }
  };
  const renderMenuItems = () => {
    const adminItems = (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-md w-full">
              <h2 className="text-2xl font-bold mb-4">Buat Laporan</h2>
              <div className="flex flex-row gap-24 sm:flex sm:flex-col sm:gap-4">
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
                    className="w-80 h-10"
                  >
                    {userData?.map((name: any) => (
                      <MenuItem key={name.id} value={name.id}>
                        {name.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Omzet
                  </label>
                  <input
                    type="text"
                    value={omzet}
                    onChange={(e) => handleChangeOmzet(e.target?.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {errorOmzet && (
                    <p className="text-red-500 text-[10px]">{errorOmzet}</p>
                  )}

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Modal
                  </label>
                  <input
                    type="text"
                    value={modal}
                    onChange={(e) => handleChangeModal(e.target?.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />{" "}
                  {errorModal && (
                    <p className="text-red-500 text-[10px]">{errorModal}</p>
                  )}
                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tanggal Pelaporan
                  </label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e: any) => setTanggal(e.target.value)}
                    className="ps-2 pr-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Keterangan
                  </label>
                  <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Laporan Minggu ke-
                  </label>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={laporanMinggu}
                    onChange={handleChangeLaporanMingguan}
                    label="Name"
                    className="w-80 h-10"
                  >
                    <MenuItem key="minggu1" value="minggu1">
                      Minggu 1
                    </MenuItem>
                    <MenuItem key="minggu2" value="minggu2">
                      Minggu 2
                    </MenuItem>
                    <MenuItem key="minggu3" value="minggu3">
                      Minggu 3
                    </MenuItem>
                    <MenuItem key="minggu4" value="minggu4">
                      Minggu 4
                    </MenuItem>
                  </Select>

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4"></div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Bukti Transaki
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleChangeFile(e)}
                    className="ps-2 mt-1 block sm:w-80 md:w-[700px] py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-end gap-4">
                <button
                  onClick={onClosed}
                  className="w-20 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handlerSubmit()}
                  className="w-20 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
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
              <h2 className="text-2xl font-bold mb-4">Buat Laporan</h2>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Omzet
                  </label>
                  <input
                    type="text"
                    value={omzet}
                    onChange={(e) => handleChangeOmzet(e.target?.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {errorOmzet && (
                    <p className="text-red-500 text-[10px]">{errorOmzet}</p>
                  )}
                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Modal
                  </label>
                  <input
                    type="text"
                    value={modal}
                    onChange={(e) => handleChangeModal(e.target?.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {errorModal && (
                    <p className="text-red-500 text-[10px]">{errorModal}</p>
                  )}
                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tanggal Pelaporan
                  </label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e: any) => setTanggal(e.target.value)}
                    className="mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Keterangan
                  </label>
                  <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="ps-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:flex-row md:gap-16 sm:flex sm:flex-col sm:gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Laporan Minggu ke-
                  </label>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={laporanMinggu}
                    onChange={handleChangeLaporanMingguan}
                    label="Name"
                    className="w-80 h-10"
                  >
                    <MenuItem key="minggu1" value="minggu1">
                      Minggu 1
                    </MenuItem>
                    <MenuItem key="minggu2" value="minggu2">
                      Minggu 2
                    </MenuItem>
                    <MenuItem key="minggu3" value="minggu3">
                      Minggu 3
                    </MenuItem>
                    <MenuItem key="minggu4" value="minggu4">
                      Minggu 4
                    </MenuItem>
                  </Select>

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
                <div className="mb-4"></div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Bukti Transaki
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleChangeFile(e)}
                    className="ps-2 mt-1 block sm:w-80 md:w-[700px] py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />

                  {errorFieldEmpty && (
                    <p className="text-red-500 text-[10px]">
                      {errorFieldEmpty}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-end gap-4">
                <button
                  onClick={onClosed}
                  className="w-20 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handlerSubmit()}
                  className="w-20 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
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

  return <>{renderMenuItems()}</>;
};

export default AddLaporanOmzetForm;
