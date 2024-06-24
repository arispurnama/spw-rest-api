"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import AddProdukSiswaForm from "@/components/produksiswa/AddProdukSiswaForm";
import EditProdukSiswaForm from "@/components/produksiswa/EditProdukSiswaForm";

const DataProdukSiswa = () => {
  const router = useRouter();
  const [dataProdukSiswa, setProdukSiswa] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [dataEdit, setDataEdit] = useState();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [userIdParam, setUserIdParam] = useState(null);
  const [roleName, setRoleName] = useState("");

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
  const getAllDataProdukSiswa = async () => {
    try {
      axios
        .get("http://localhost:3030/produk-siswa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page, // ganti dengan nilai yang sesuai
            size: rowsPerPage, // ganti dengan nilai yang sesuai
            search: searchQuery,
            userId: user?.name == "Admin" ? null : user?.id,
          },
        })
        .then((response) => {
          console.log("response get all user :", response);
          if (response.data.erorr === "Invalid token") {
          }
          setProdukSiswa(response.data.data);
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
    let userLocalStorage: any = JSON.parse(x);
    setRoleName(userLocalStorage?.name);
    getAllDataProdukSiswa();
    getUserAll();
  }, [searchQuery]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getAllDataProdukSiswa();
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
        <div className="h-screen">
          <div className="flex flex-col gap-4 m-0">
            <div>
              <h2 className="pl-10 pt-8 pb-0 m-0 font-bold text-2xl">
                DATA PRODUK SISWA
              </h2>
            </div>
            <div className="flex flex-row justify-end pr-9">
              <div className="flex gap-4 p-3">
                <input
                  type="text"
                  placeholder="search"
                  className="rounded-[18px] px-20 ps-4"
                  onChange={(e: any) => {
                    handleSearchChange(e.target.value);
                    console.log(searchQuery);
                  }}
                />
                <button
                  className="px-6 py-2 bg-blue-400 rounded-lg"
                  onClick={() => setShowModalAdd(true)}
                >
                  + add
                </button>
              </div>
            </div>
          </div>
          <div className="md:pr-10 md:pl-10 sm:pr-1 sm:pl-1">
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 450 }}>
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Nama Produk</TableCell>
                      <TableCell align="right">Keterangan</TableCell>
                      <TableCell align="right">Tanggal</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataProdukSiswa
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
                          <TableCell align="right">{row.namaProduk}</TableCell>
                          <TableCell align="right">{row.keterangan}</TableCell>
                          <TableCell align="right">
                            {row.tanggalproduk}
                          </TableCell>
                          <TableCell align="right">{row.keterangan}</TableCell>
                          <TableCell className="flex flex-row gap-4 justify-end">
                            <button
                              onClick={() => handleEditClick(row.id, row)}
                              title="Edit Produk Siswa"
                            >
                              <IconFileDocumentEditOutline />
                            </button>
                            <button onClick={() => handleDeleteClick(row.id)}
                              title="Delete Produk Siswa">
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
                count={dataProdukSiswa.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <DeleteConfirmationModal
            isOpen={showModal}
            Id={selectedUserId}
            url="produk-siswa"
            page="produksiswa"
            onClosed={() => {
              setShowModal(false);
              getAllDataProdukSiswa();
            }}
          />
          <AddProdukSiswaForm
            isOpen={showModalAdd}
            userData={dataUser}
            onClosed={() => {
              setShowModalAdd(false);
              getAllDataProdukSiswa();
            }}
          />
          <EditProdukSiswaForm
            isOpen={showModalEdit}
            id={selectedUserId}
            DataEdit={dataEdit}
            userData={dataUser}
            onClosed={() => {
              setShowModalEdit(false);
              getAllDataProdukSiswa();
            }}
          />
        </div>

        <div className="pt-14">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default DataProdukSiswa;
