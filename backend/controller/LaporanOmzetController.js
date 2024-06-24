import Sequelize, { DATE } from "sequelize";
import db from "../config/Database.js";
import LaporanOmzet from "../model/Laporan.js";
import { PaginationHelper, QueryHelper } from "../Helper/QueryHalper.js";
import Users from "../model/Users.js";
import { sendEmail } from "../middleware/senEmail.js";
import excelJS from "exceljs";

const { QueryTypes } = Sequelize;

export const exportLaporan = async (req, res) => {
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("data"); // New Worksheet
  const path = "D:\\Tugas Akhir\\Project\\FullStack-1\\file\\"; // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "First Name", key: "firstName", width: 10 },
    { header: "Last Name", key: "lastName", width: 10 },
    { header: "Full Name", key: "fullName", width: 10 },
    { header: "Class", key: "kelas", width: 10 },
    { header: "No. Handphone", key: "noHp", width: 10 },
    { header: "Modal", key: "JumlahModal", width: 10 },
    { header: "Omzet", key: "jumlahOmzet", width: 10 },
    { header: "Laporan Mingguan", key: "laporanMingguan", width: 10 },
    { header: "Keterangan", key: "keterangan", width: 10 },
  ];
  //
  let query =
    'SELECT count(*) over () TOTALDATA, tmu."fullName", tmu."noHp",tl.id, tl."userId",tl."laporanMingguan", to_char(tl."tanggalLaporan", ' +
    "'YYYY-MM-DD'" +
    ')  as tanggalLaporan, tl."jumlahOmzet", tl."JumlahModal", tl."buktiTransaksi", tl.keterangan, tl."isApproved", tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_LAPORAN" tl inner join public."TB_MD_USER" tmu on tl."userId" = tmu.id where tl."isDeleted" = false and tmu."isDeleted" = false ';
  let queryString = QueryHelper(query, "", "", "", "", "", "");
  const response = await db.query(queryString, {
    type: QueryTypes.SELECT,
  });
  console.log("responsee  : ", response);
  // Looping through User data
  let counter = 1;
  response.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    // Write to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');

    // Send buffer
    res.send(buffer);
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export const getListLaporanOmzet = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let page = req.query.page;
    let size = req.query.size;
    let search = req.query.search;
    let userId = req.query.userId;
    if (userId != null && userId != undefined) {
      filter += ` and tmu.id = ${userId} `;
    }
    let searchColumn =
      'tl.id, tl."userId",tmu."fullName", tmu."noHp", tl."tanggalLaporan", tl."jumlahOmzet",tl."laporanMingguan", tl."JumlahModal", to_char(tl."tanggalLaporan", ' +
      "'YYYY-MM-DD'" +
      '), tl.keterangan, tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tl."isApproved", tmu."firstName", tmu."lastName"';
    let query =
      'SELECT count(*) over () TOTALDATA, tmu."fullName", tmu."noHp",tl.id, tl."userId",tl."laporanMingguan", to_char(tl."tanggalLaporan", ' +
      "'YYYY-MM-DD'" +
      ')  as tanggalLaporan, tl."jumlahOmzet", tl."JumlahModal", tl."buktiTransaksi", tl.keterangan, tl."isApproved", tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_LAPORAN" tl inner join public."TB_MD_USER" tmu on tl."userId" = tmu.id where tl."isDeleted" = false and tmu."isDeleted" = false ';
    let paggination = PaginationHelper(page, size);
    let queryString = QueryHelper(
      query,
      filter,
      search,
      searchColumn,
      "",
      paggination,
      ""
    );
    const response = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });

    let queryStringCount = QueryHelper(
      query,
      filter,
      search,
      searchColumn,
      "",
      "",
      ""
    );
    const total = await db.query(queryStringCount, {
      type: QueryTypes.SELECT,
    });
    let totalData = 0;
    if (total.length > 0) {
      totalData = total[0].totaldata;
    }
    responsePagination.page = parseInt(page);
    responsePagination.size = parseInt(size);
    responsePagination.total = parseInt(totalData);
    responsePagination.data = response;
    responsePagination.error = false;
    responsePagination.errorMessage = "Sukses";
    res.status(200).json(responsePagination);
  } catch (error) {
    responsePagination.error = true;
    responsePagination.errorMessage = error.message;
    console.log(error.message);
  }
};

export const createLaporanOmzet = async (req, res) => {
  const response = new Object();
  try {
    let payload = req.body;
    payload.createdAt = new Date().toDateString();
    payload.updatedAt = new Date().toDateString();
    payload.isDeleted = false;
    payload.isApproved = false;

    const result = await LaporanOmzet.create(payload);
    response.data = result;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};
export const updateLaporanOmzet = async (req, res) => {
  const response = new Object();
  try {
    const payload = req.body;
    payload.updatedAt = new Date().toDateString();
    await LaporanOmzet.update(payload, {
      where: {
        id: req.params.id,
      },
    });
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};
export const deleteLaporanOmzet = async (req, res) => {
  const response = new Object();
  try {
    let payload = {
      deletedAt: new Date().toDateString(),
      isDeleted: true,
    };
    await LaporanOmzet.update(payload, {
      where: {
        id: req.params.id,
      },
    });
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};
export const getLaporanOmzetById = async (req, res) => {
  try {
    const response = await LaporanOmzet.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getSequenceASCLaporan = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let orderBy = ` tl."jumlahOmzet" DESC `;
    let page = req.query.page;
    let size = req.query.size;
    let search = req.query.search;
    let userId = req.query.userId;
    if (userId != null && userId != undefined) {
      filter += ` and tmu.id = ${userId} `;
    }

    let searchColumn =
      'tl.id, tl."userId", tl."tanggalLaporan", tl."jumlahOmzet", tl."JumlahModal", to_char(tl."tanggalLaporan", ' +
      "'YYYY-MM-DD'" +
      '), tl.keterangan, tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName"';
    let query =
      'SELECT count(*) over () TOTALDATA, tl.id, tl."userId", to_char(tl."tanggalLaporan", ' +
      "'YYYY-MM-DD'" +
      ')  as tanggalLaporan, tl."jumlahOmzet", tl."JumlahModal", tl."buktiTransaksi", tl.keterangan, tl."createdAt", tl."updatedAt", tl."deletedAt", tl."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_LAPORAN" tl inner join public."TB_MD_USER" tmu on tl."userId" = tmu.id where tl."isDeleted" = false and tmu."isDeleted" = false ';
    let paggination = PaginationHelper(page, size);
    let queryString = QueryHelper(
      query,
      filter,
      search,
      searchColumn,
      orderBy,
      paggination,
      ""
    );
    const response = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });

    let queryStringCount = QueryHelper(
      query,
      filter,
      search,
      searchColumn,
      orderBy,
      "",
      ""
    );
    const total = await db.query(queryStringCount, {
      type: QueryTypes.SELECT,
    });
    let totalData = 0;
    if (total.length > 0) {
      totalData = total[0].totaldata;
    }
    responsePagination.page = parseInt(page);
    responsePagination.size = parseInt(size);
    responsePagination.total = parseInt(totalData);
    responsePagination.data = response;
    responsePagination.error = false;
    responsePagination.errorMessage = "Sukses";
    res.status(200).json(responsePagination);
  } catch (error) {
    responsePagination.error = true;
    responsePagination.errorMessage = error.message;
    console.log(error.message);
  }
};
export const getSummaryChartlaporan = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let isAdmin = req.query.isAdmin;
    let userId = req.query.userId;
    let year = req.query.year;
    if (isAdmin) {
      if (userId != null && userId != undefined) {
        filter += ` and tmu.id = ${userId} `;
      }
      if(year!= null && year != undefined){
        filter += ` AND Date_part('year', tl."tanggalLaporan") = ${parseInt(year)} `;  
      }
      let groupBy =
        'GROUP BY tl."laporanMingguan", EXTRACT(MONTH FROM tl."tanggalLaporan")';
      let query =
        'SELECT SUM(tl."jumlahOmzet") AS totalOmzet, tl."laporanMingguan", EXTRACT(MONTH FROM tl."tanggalLaporan") AS laporanBulan FROM public."TB_TR_LAPORAN" tl INNER JOIN public."TB_MD_USER" tmu ON tl."userId" = tmu.id WHERE tl."isDeleted" = false AND tmu."isDeleted" = false ';

      let queryString = QueryHelper(query, filter, "", "", "", "", groupBy);
      const response = await db.query(queryString, {
        type: QueryTypes.SELECT,
      });
      // Array of month names
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize an array with all 12 months
      const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        minggu1: null,
        minggu2: null,
        minggu3: null,
        minggu4: null,
      }));
      const mergedData = mergeData(allMonths, response);

      responsePagination.data = mergedData;
      responsePagination.error = false;
      responsePagination.errorMessage = "Sukfdgdfgses";
      res.status(200).json(responsePagination);
    } else {
      if (userId != null && userId != undefined) {
        filter += ` and tmu.id = ${userId} `;
      }
      if(year!= null && year != undefined){
        filter += ` AND Date_part('year', tl."tanggalLaporan") = ${parseInt(year)} `;  
      }
      let groupBy =
        'GROUP BY tl."userId", tl."laporanMingguan", EXTRACT(MONTH FROM tl."tanggalLaporan")';
      let query =
        'SELECT tl."userId", SUM(tl."jumlahOmzet") AS totalOmzet, tl."laporanMingguan", EXTRACT(MONTH FROM tl."tanggalLaporan") AS laporanBulan FROM public."TB_TR_LAPORAN" tl INNER JOIN public."TB_MD_USER" tmu ON tl."userId" = tmu.id WHERE tl."isDeleted" = false AND tmu."isDeleted" = false ';

      let queryString = QueryHelper(query, filter, "", "", "", "", groupBy);
      const response = await db.query(queryString, {
        type: QueryTypes.SELECT,
      });

      // Array of month names
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize an array with all 12 months
      const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        minggu1: null,
        minggu2: null,
        minggu3: null,
        minggu4: null,
      }));
      const mergedData = mergeData(allMonths, response);

      responsePagination.data = mergedData;
      responsePagination.error = false;
      responsePagination.errorMessage = "Suksdsadases";
      res.status(200).json(responsePagination);
    }
  } catch (error) {
    responsePagination.error = true;
    responsePagination.errorMessage = error.message;
    console.log(error.message);
  }
};
// Helper function to merge data into allMonths
const mergeData = (allMonths, data) => {
  data.forEach((curr) => {
    const monthIndex = curr.laporanbulan - 1; // Convert to 0-based index
    const weekKey = `${curr.laporanMingguan}`;
    allMonths[monthIndex][weekKey] = curr.totalomzet;
  });
  return allMonths;
};

export const approveLaporan = async (req, res) => {
  const response = new Object();
  try {
    const dataLaporan = await LaporanOmzet.findOne({
      where: {
        id: req.params.id,
      },
    });
    let userId = dataLaporan.userId;
    const result = await Users.findOne({
      where: {
        id: userId,
      },
    });

    let payload = {
      isApproved: true,
    };
    await LaporanOmzet.update(payload, {
      where: {
        id: req.params.id,
      },
    });
    let html = ``;
    await sendEmail(
      result.email,
      "Notification Approve Report",
      "Your report has been approved!!!",
      html
    );
    response.data = result;
    response.error = false;
    response.errorMessage = "Sukses";
    res.status(201).json({ response });
  } catch (error) {
    console.log("Approve error : ", error);
    response.error = true;
    response.errorMessage = error.message;
    res.status(500).json({ response });
  }
};

export const getSumModalAndOmzet = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let userId = req.params.userId;
    console.log("user   : ", userId)
    if (userId != null && userId != undefined) {
      filter += ` and tmu.id = ${userId} `;
    }

    let query =
      'SELECT SUM(tl."jumlahOmzet") as jumlahOmzet, SUM(tl."JumlahModal") as JumlahModal FROM public."TB_TR_LAPORAN" tl inner join public."TB_MD_USER" tmu on tl."userId" = tmu.id where tl."isDeleted" = false and tmu."isDeleted" = false';

    let queryString = QueryHelper(query, filter, "", "", "", "", "");
    const response = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });

    responsePagination.data = response;
    responsePagination.error = false;
    responsePagination.errorMessage = "Sukses";
    res.status(200).json(responsePagination);
  } catch (error) {
    responsePagination.error = true;
    responsePagination.errorMessage = error.message;
    console.log(error.message);
  }
};
