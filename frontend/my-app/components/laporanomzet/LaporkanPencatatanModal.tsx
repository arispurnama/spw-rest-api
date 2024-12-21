'use client';
import React, {useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SnackBar from "../SnackBar";

type Props = {
  isOpen: boolean;
  Id: string;
  page: string;
  onClosed: () => void;
};
const LaporkanPencatatanModal = ({isOpen, Id, page, onClosed}:Props) => {
  const router = useRouter();
  const [errorType, setErrorType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSnackBar, setSnackBar] = useState(false);

  if (!isOpen) return null;

  let token = null;
  try {
    token = localStorage.access_token
      ? JSON.parse(localStorage.access_token)
      : null;
  } catch (e) {
    console.error("Error parsing token from localStorage:", e);
  }
 
  const Approve = async () => {
    try {
      axios
      .patch(`http://localhost:3030/laporan/laporkan-pencatatan/${Id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add your token or any other header here
        },
      })
        .then((response) => {
          setErrorType("success");
          setErrorMessage(response.data.response.errorMessage);
          setSnackBar(true);
          setTimeout(() =>{
            onClosed();
            //window.location.reload();
          }, 1000)
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            setErrorType("error");
            setErrorMessage("Unauthorized access - perhaps you need to log in?");
            setTimeout(() => {
              setSnackBar(true);
              router.push("/Auth");
            }, 1000);
          }
        });
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirmation of Recording Reporting</h2>
        <p>Are you sure you want to report recording this data?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClosed}
          >
            No
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => Approve()}
          >
            Yes
          </button>
        </div>
      </div>
        <SnackBar 
        isOpen={showSnackBar}
        message={errorMessage}
        type={errorType}
        duration={5000}
        onClose={() => setSnackBar(false)}
        />
    </div>
  );
};

export default LaporkanPencatatanModal;
