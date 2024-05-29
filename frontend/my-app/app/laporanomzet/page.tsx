"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditLaporanOmzetForm from "@/components/laporanomzet/EditLaporanOmzetForm"

//library
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconTrashBinOutline from "@/components/icons/IconTrashBinOutline";
import IconFileDocumentEditOutline from "@/components/icons/IconFileDocumentEditOutline";
import AddLaporanOmzetForm from "@/components/laporanomzet/AddLaporanOmzetForm";

const DataLaporanOmzet = () => {
  const router = useRouter();
  const [dataLaporanOmzet, setDataLaporanOmzet] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataEdit, setDataEdit] = useState();
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    user = localStorage.access_token ? JSON.parse(localStorage.user) : null;
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
  }

  const getAllDataLaporanOmzet = async () => {
    try {
      axios
        .get("http://localhost:3030/laporan-omzet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page, // ganti dengan nilai yang sesuai
            size: rowsPerPage, // ganti dengan nilai yang sesuai
            search: searchQuery,
          },
        })
        .then((response) => {
          console.log("response get all user :", response);
          if (response.data.erorr === "Invalid token") {
          }
          setDataLaporanOmzet(response.data.data);
          setTotalData(response.data.total);
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
  const getUserAll = async () => {
    try {
      axios
        .get("http://localhost:3030/list-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: -1, // ganti dengan nilai yang sesuai
            size: -1, // ganti dengan nilai yang sesuai
            //search: searchQuery,
          },
        })
        .then((response) => {
          setDataUser(response.data.data);
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
    getAllDataLaporanOmzet();
    getUserAll();
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getAllDataLaporanOmzet();
  };
  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };
  const handleEditClick = (userId: string, data: any) => {
    setSelectedUserId(userId);
    setDataEdit(data);
    setShowModalEdit(true);
  };
  return (
    <main>
      <div>
        <Header />
        <div>
          <div className="flex flex-col gap-4 m-0">
            <div>
              <h2 className="pl-10 pt-8 pb-0 m-0 font-bold text-2xl">
                DATA LAPORAN OMZET
              </h2>
            </div>
            <div className="flex flex-row justify-end pr-9 pt-0">
              <div className="flex gap-4 p-3">
                <input
                  type="text"
                  placeholder="search"
                  className="rounded-full px-10"
                  onChange={(e: any) => {
                    handleSearchChange(e.target.value);
                    console.log(searchQuery);
                  }}
                />
                <button
                  onClick={() => setShowModalAdd(true)}
                  className="px-6 py-2 bg-blue-400 rounded-lg"
                >
                  + add
                </button>
              </div>
            </div>
          </div>
          <div className="pr-10 pl-10 min-[6500px] max-[900px]">
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Omzet</TableCell>
                      <TableCell align="right">Modal</TableCell>
                      <TableCell align="right">Tanggal Laporan</TableCell>
                      <TableCell align="right">Keterangan</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataLaporanOmzet
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row: any) => (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {row.firstName}
                          </TableCell>
                          <TableCell align="right">{row.lastName}</TableCell>
                          <TableCell align="right">{row.jumlahOmzet}</TableCell>
                          <TableCell align="right">{row.JumlahModal}</TableCell>
                          <TableCell align="right">
                            {row.tanggalLaporan}
                          </TableCell>
                          <TableCell align="right">{row.keterangan}</TableCell>
                          <TableCell className="flex flex-row gap-4 justify-end">
                            <button onClick={() => handleEditClick(row.id, row)}>
                              <IconFileDocumentEditOutline />
                            </button>
                            <button onClick={() => handleDeleteClick(row.id)}>
                              <IconTrashBinOutline />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={dataLaporanOmzet.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>

        <div className="pt-14">
          <Footer />
        </div>
        <DeleteConfirmationModal
          isOpen={showModal}
          Id={selectedUserId}
          url="laporan-omzet"
          page="laporanomzet"
          onClosed={() => setShowModal(false)}
        />
        <AddLaporanOmzetForm
          isOpen={showModalAdd}
          userData={dataUser}
          onClosed={() => setShowModalAdd(false)}
        />
        <EditLaporanOmzetForm
          isOpen={showModalEdit}
          id={selectedUserId}
          laporanDataEdit={dataEdit}
          userData={dataUser}
          onClosed={() => setShowModalEdit(false)}
        />
      </div>
    </main>
  );
};

export default DataLaporanOmzet;
