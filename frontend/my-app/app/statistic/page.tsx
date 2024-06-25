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
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { stringify } from "querystring";

const chartSetting = {
  yAxis: [
    {
      label: "Summary (Rp)",
      font: "bold",
    },
  ],
  width: 1200,
  height: 600,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-50px, 0)",
    },
  },
};
const valueFormatter = (value: number | null) => `Rp.${value}`;

const SummaryStatistik = () => {
  const router = useRouter();
  const [dataLaporanOmzet, setDataLaporanOmzet] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataset, setDataSet] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userIdParam, setUserIdParam] = useState("");
  const [roleName, setRoleName] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [userIdState, setUserIdState] = useState("");
  const [yearState, setYearState] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userIdLaporan, setUserIdLaporan] = useState("");
  const [sumDescriptionOmzet, setSumDescriptionOmzet] = useState("");
  const [sumDescriptionModal, setSumDescriptionModal] = useState("");

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
        .get("http://localhost:3030/summary-laporan-omzet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page, // ganti dengan nilai yang sesuai
            size: rowsPerPage, // ganti dengan nilai yang sesuai
            search: searchQuery,
            startDate: startDate,
            endDate: endDate,
            userId: userIdLaporan,
          },
        })
        .then((response) => {
          console.log("response get all user :", response);
          if (response.data.erorr === "Invalid token") {
          }
          setDataLaporanOmzet(response.data.data);
          setSumDescriptionOmzet(response.data.SumDescription.omzet);
          setSumDescriptionModal(response.data.SumDescription.modal);
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
  const getChart = async () => {
    try {
      axios
        .get("http://localhost:3030/summary-chart-laporan-omzet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            isAdmin: isAdmin,
            userId: userIdState === "" ? user?.id : userIdState,
            year: yearState === 0 ? currentYear : yearState,
          },
        })
        .then((response) => {
          console.log("response get all user :", userIdParam);
          setDataSet(response.data.data);
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
            //userId: user?.name == "Admin" ? null : user?.id,
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
  const currentYear = new Date().getFullYear();
  const listYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  useEffect(() => {
    var x: any = localStorage.getItem("user");
    let userLocalStorage: any = JSON.parse(x);
    setRoleName(userLocalStorage?.name);
    getAllDataLaporanOmzet();
    getChart();
    getUserAll();
  }, [userIdState, yearState, searchQuery, userIdLaporan, startDate, endDate]);
  // useEffect(() => {
  //   getChart();
  // }, [userIdState, yearState]);
  // useEffect(() => {
  //   getAllDataLaporanOmzet();
  // }, [searchQuery]);
  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getAllDataLaporanOmzet();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setUserIdState(event.target.value as string);
    setIsAdmin(true as boolean);
    getChart();
  };
  const handleChangeSummaryUserId = (event: SelectChangeEvent) => {
    setUserIdLaporan(event.target.value as string);
    getAllDataLaporanOmzet();
  };
  const handleChangeYear = (event: any) => {
    setYearState(event.target.value);
    setIsAdmin(true as boolean);
    getChart();
  };
  return (
    <main>
      <div>
        <Header />
        <div>
          <div className="md:flex md:flex-col md:gap-4 md:m-0 sm:flex sm:flex-col sm:gap-4 sm:m-0">
            <div>
              <h2 className="pl-10 pt-8 pb-0 m-0 font-bold text-2xl">
                STATISTIC
              </h2>
            </div>
          </div>

          <div className="md:mr-9 md:ml-9 md:pb-9 sm:pb-3 sm:mr-0 sm:ml-0">
            <div className="bg-white rounded-sm">
              <div className="pl-28 pt-8 pb-0 m-0 font-bold text-xl">
                SUMMARY SUM OMZET {currentYear}
              </div>
              <div className="flex flex-row justify-end pr-10">
                <div className="pl-20 flex flex-row items-end gap-4">
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
                      {dataUser?.map((name: any) => (
                        <MenuItem key={name.id} value={name.id}>
                          {name.firstName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Years
                    </label>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={yearState}
                      onChange={handleChangeYear}
                      label="year"
                      className="w-80 h-10"
                    >
                      {listYears?.map((year: any) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row justify-center pl-4 pr-2">
                  <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[
                      { dataKey: "minggu1", label: "Minggu 1", valueFormatter },
                      { dataKey: "minggu2", label: "Minggu 2", valueFormatter },
                      { dataKey: "minggu3", label: "Minggu 3", valueFormatter },
                      { dataKey: "minggu4", label: "Minggu 4", valueFormatter },
                    ]}
                    {...chartSetting}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:mr-9 md:ml-9 md:pb-9 sm:pb-3 sm:mr-0 sm:ml-0">
            <div className="md:pr-10 md:pl-10 min-[6500px] max-[900px] sm:pr-1 sm:pl-1 bg-white">
              <div className="pl-28 pt-8 pb-4 font-bold text-xl">
                SUMMARY ALL LAPORAN
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    className="ps-2 pr-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    className="ps-2 pr-2 mt-1 block w-80 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Siswa
                  </label>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={userIdLaporan}
                    onChange={handleChangeSummaryUserId}
                    label="Name"
                    className="w-80 h-10"
                  >
                    {dataUser?.map((name: any) => (
                      <MenuItem key={name.id} value={name.id}>
                        {name.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <div className="flex gap-4 pb-3">
                  <input
                    type="text"
                    placeholder="search"
                    className="rounded-full w-80 p-2 border"
                    onChange={(e: any) => {
                      handleSearchChange(e.target.value);
                      console.log(searchQuery);
                    }}
                  />
                </div>
              </div>
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataLaporanOmzet
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((row: any) => (
                          <TableRow
                            className={
                              roleName == "Admin"
                                ? ""
                                : user?.id == row.userId
                                ? "bg-blue-300"
                                : ""
                            }
                          >
                            <TableCell component="th" scope="row">
                              {row.firstName}
                            </TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                            <TableCell align="right">
                              {row.jumlahOmzet}
                            </TableCell>
                            <TableCell align="right">
                              {row.JumlahModal}
                            </TableCell>
                            <TableCell align="right">
                              {row.tanggallaporan}
                            </TableCell>
                            <TableCell align="right">
                              {row.keterangan}
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
              <div className="text-xl text-black flex flex-col">
                <p>Total Omzet : Rp. {sumDescriptionOmzet}</p>
                <p>Total Modal : Rp. {sumDescriptionModal}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default SummaryStatistik;
