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

const chartSetting = {
  yAxis: [
    {
      label: "Summary (Rp)",
    },
  ],
  width: 1100,
  height: 600,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
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
  const [userIdParam, setUserIdParam] = useState('');
  const [roleName, setRoleName] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
          },
        })
        .then((response) => {
          console.log("response get all user :", response);
          if (response.data.erorr === "Invalid token") {
          }
          setDataLaporanOmzet(response.data.data);
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
            isAdmin: user?.name === "Admin" ? true : false,
            userId: user?.name === "Admin" ? null : user?.id,
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

  useEffect(() => {
    var x: any = localStorage.getItem("user");
    let userLocalStorage: any = JSON.parse(x);
    setRoleName(userLocalStorage?.name);
    setIsAdmin(true);
    getAllDataLaporanOmzet();
    getChart();
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event);
    getAllDataLaporanOmzet();
  };

  return (
    <main>
      <div>
        <Header />
        <div>
          <div className="flex flex-col gap-4 m-0">
            <div>
              <h2 className="pl-10 pt-8 pb-0 m-0 font-bold text-2xl">
                STATISTIC
              </h2>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "minggu1", label: "minggu 1", valueFormatter },
                { dataKey: "minggu2", label: "minggu 2", valueFormatter },
                { dataKey: "minggu3", label: "minggu 3", valueFormatter },
                { dataKey: "minggu4", label: "minggu 4", valueFormatter },
              ]}
              {...chartSetting}
            />
          </div>
          <div className="pr-10 pl-10 min-[6500px] max-[900px]">
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
                          <TableCell align="right">{row.jumlahOmzet}</TableCell>
                          <TableCell align="right">{row.JumlahModal}</TableCell>
                          <TableCell align="right">
                            {row.tanggallaporan}
                          </TableCell>
                          <TableCell align="right">{row.keterangan}</TableCell>
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
      </div>
    </main>
  );
};

export default SummaryStatistik;
