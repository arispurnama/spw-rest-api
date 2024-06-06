"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

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
import SnackBar from "@/components/SnackBar";

const DataUser = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

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
    console.log("Error parsing token from localStorage:", e);
  }

  const getUserAll = async () => {
    try {
      axios
        .get("http://localhost:3030/list-user", {
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
          setDataUser(response.data.data);
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
  useEffect(() => {
    getUserAll();
  }, []);

  const deleteUser = async (userId: any) => {
    try {
      axios
        .delete(`http://localhost:3030/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("delete :", response.data.response.data);
          window.location.href = "/datauser";
        })
        .catch((e) => {
          console.log("error :", e);
          if (e.response.status === 401) {
            console.error("Unauthorized access - perhaps you need to log in?");
            router.push("/Auth");
          }
        });
    } catch (error) {
      console.error("Error fetching User: ", error);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getUserAll();
  };
  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  return (
    <main>
      <div>
        <Header />
        <div>
          <div className="flex flex-col gap-1 m-0">
            <div>
              <h2 className="pl-10 pt-8 pb-0 m-0 font-bold text-2xl">
                DATA USER
              </h2>
            </div>
            <div className="flex flex-row justify-end pr-10 pt-0">
              <div className="flex gap-4 p-3">
                <input
                  type="text"
                  placeholder="search"
                  className="rounded-full min-w-[78]"
                  onChange={(e: any) => {
                    handleSearchChange(e.target.value);
                    console.log(searchQuery);
                  }}
                />
                <button className="px-6 py-2 bg-blue-400 rounded-lg">
                  + add
                </button>
              </div>
            </div>
          </div>
          <div className="pr-10 pl-10">
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Full Name</TableCell>
                      <TableCell align="right">No. Hp</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Kelas</TableCell>
                      <TableCell align="right">Username</TableCell>
                      <TableCell align="right">Role</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataUser
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
                          <TableCell align="right">{row.noHp}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.kelas}</TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell className="flex flex-row gap-4 justify-end">
                            <button>
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
                count={dataUser.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
        <div>
          <Footer />
        </div>
        <DeleteConfirmationModal
          isOpen={showModal}
          Id={selectedUserId}
          url="user"
          page="datauser"
          onClosed={() => setShowModal(false)}
        />
      </div>
    </main>
  );
};

export default DataUser;
