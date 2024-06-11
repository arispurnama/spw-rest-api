import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import GaleriBerita from "../model/GaleriBerita.js";
import { PaginationHelper, QueryHelper } from "../Helper/QueryHalper.js";

const { QueryTypes } = Sequelize;
const uploadDir = "D:\\uploads/";

export const getListGaleriBerita = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let page = req.query.page;
    let size = req.query.size;
    let search = req.query.search;
    let userId = req.query.userId;
    if(userId != null && userId != undefined){
      filter += ` and tmu.id = ${userId} `;
    }
    let searchColumn =
      'gb.id, "userId", to_char(gb.tanggal, '+ "'YYYY-MM-DD'" + '), gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id, tmu."firstName", tmu."lastName" ,tmu."fullName", tmu."noHp"';
    let query =
      'SELECT count(*) over () TOTALDATA, gb.id, "userId", to_char(gb.tanggal, '+ "'YYYY-MM-DD'" + ')  as tanggal, gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id as userId, tmu."firstName", tmu."lastName",tmu."fullName", tmu."noHp" FROM public."TB_TR_GALERI_BERITA" as gb inner join public."TB_MD_USER" tmu on gb."userId" = tmu.id where gb."isDeleted" = false and tmu."isDeleted" = false ';
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
    responsePagination.page = page;
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


export const getSummary = async (req, res) => {
  const responsePagination = new Object();
  try {
    let filter = "";
    let search = req.query.search;
    let searchColumn =
      'gb.id, "userId", to_char(gb.tanggal, '+ "'YYYY-MM-DD'" + '), gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id, tmu."firstName", tmu."lastName" ,tmu."fullName", tmu."noHp"';
    let query =
      'SELECT count(*) over () TOTALDATA, gb.id, "userId", to_char(gb.tanggal, '+ "'YYYY-MM-DD'" + ')  as tanggal, gb."fileName", gb.keterangan, gb."judulBerita", gb."createdAt", gb."updatedAt", gb."deletedAt", gb."isDeleted", tmu.id as userId, tmu."firstName", tmu."lastName",tmu."fullName", tmu."noHp" FROM public."TB_TR_GALERI_BERITA" as gb inner join public."TB_MD_USER" tmu on gb."userId" = tmu.id where gb."isDeleted" = false and tmu."isDeleted" = false ';

    let queryString = QueryHelper(
      query,
      filter,
      search,
      searchColumn,
      "",
      "",
      ""
    );
    const response = await db.query(queryString, {
      type: QueryTypes.SELECT,
    });

    // Convert mergedData to the desired format
    const responseData = response.map(item => ({
      img: `${uploadDir}${item.fileName}`,
      title: item.judulBerita,
      author: item.keterangan,
    }));
    
    responsePagination.data = responseData;
    responsePagination.error = false;
    responsePagination.errorMessage = "Sukses";
    res.status(200).json(responsePagination);
  } catch (error) {
    responsePagination.error = true;
    responsePagination.errorMessage = error.message;
    console.log(error.message);
  }
};

export const createGaleriBerita = async (req, res) => {
  const response = new Object();
  try {
    let payload = req.body;
    let file = payload.fileName; 
    payload.fileName = file.replace(" ", "_") 
    payload.createdAt = new Date().toDateString();
    payload.updatedAt = new Date().toDateString();
    payload.isDeleted = false;
    const result = await GaleriBerita.create(payload);

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
export const updateGaleriBerita = async (req, res) => {
  const response = new Object();
  try {
    let payload = req.body;
    payload.createdAt = new Date().toDateString();
    payload.updatedAt = new Date().toDateString();

    const result = await GaleriBerita.update(payload, {
      where: {
        id: req.params.id,
      },
    });
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

export const deletedGaleriBerita = async (req, res) => {
  const response = new Object();
  try {
    await GaleriBerita.destroy({
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
export const getGaleriBeriataById = async (req, res) => {
  try {
    const response = await GaleriBerita.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
