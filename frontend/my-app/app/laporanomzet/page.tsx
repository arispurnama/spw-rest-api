"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditLaporanOmzetForm from "@/components/laporanomzet/EditLaporanOmzetForm";
import downloadService from "@/service/downloadService.js";

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
import { button } from "@nextui-org/react";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [userIdParam, setUserIdParam] = useState("");
  const [roleName, setRoleName] = useState("");

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
    user = localStorage.user ? JSON.parse(localStorage.user) : null;
    //console.log("user for header", user);
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
            userId: user?.name === "Admin" ? null : user?.id,
          },
        })
        .then((response) => {
          console.log("role name : ", user?.name);
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
            userId: user?.name == "Admin" ? null : user?.id,
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
    var x: any = localStorage.getItem("user");
    const userLocalStorage: any = JSON.parse(x);
    setRoleName(userLocalStorage?.name);
    setIsAdmin(true);
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
  const handleDownloadFile = async (name: string) => {
    await downloadService(name);
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
                      <TableCell align="right">Full Name</TableCell>
                      <TableCell align="right">Omzet</TableCell>
                      <TableCell align="right">Modal</TableCell>
                      <TableCell align="right">Tanggal Laporan</TableCell>
                      <TableCell align="right">Laporan Mingguan</TableCell>
                      <TableCell align="right">Keterangan</TableCell>
                      <TableCell align="right">Bukti Transaksi</TableCell>
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
                          <TableCell align="right">{row.fullName}</TableCell>
                          <TableCell align="right">{row.jumlahOmzet}</TableCell>
                          <TableCell align="right">{row.JumlahModal}</TableCell>
                          <TableCell align="right">
                            {row.tanggallaporan}
                          </TableCell>
                          <TableCell align="right">
                            {row.laporanMingguan.replace("minggu", "Minggu ")}
                          </TableCell>
                          <TableCell align="right">{row.keterangan}</TableCell>
                          <TableCell align="center">
                            {row.buktiTransaksi ? (
                              <button
                                onClick={() =>
                                  handleDownloadFile(row.buktiTransaksi)
                                }
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                                  />
                                </svg>
                              </button>
                            ) : (
                              ""
                            )}
                          </TableCell>
                          <TableCell className="flex flex-row gap-4 justify-end">
                            {!row.isApproved ? (
                              <>
                                <button>
                                  <svg
                                    className="w-6 h-6 text-green-400 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 22 22"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleEditClick(row.id, row)}
                                >
                                  <IconFileDocumentEditOutline />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(row.id)}
                                >
                                  <IconTrashBinOutline />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditClick(row.id, row)}
                                >
                                  <IconFileDocumentEditOutline />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(row.id)}
                                >
                                  <IconTrashBinOutline />
                                </button>
                              </>
                            )}
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
