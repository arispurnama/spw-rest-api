import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import ProdukSiswa from "../model/ProdukSiswa.js";
import { PaginationHelper, QueryHelper } from "../Helper/QueryHalper.js";

const { QueryTypes } = Sequelize;

export const getListProdukSiswa = async (req, res) => {
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
      'tps.id, tps."userId",tmu."fullName", tmu."noHp", to_char(tps."tanggalProduk",'+ "'YYYY-MM-DD'" + '), tps."namaProduk", tps.keterangan, tps."createdAt", tps."updatedAt", tps."deletedAt", tps."isDeleted", tmu."firstName", tmu."lastName"';
    let query =
      'SELECT count(*) over () TOTALDATA,tmu."fullName", tmu."noHp", tps.id, tps."userId", to_char(tps."tanggalProduk",'+ "'YYYY-MM-DD'" + ')  as tanggalProduk, tps."namaProduk", tps.keterangan, tps."createdAt", tps."updatedAt", tps."deletedAt", tps."isDeleted", tmu."firstName", tmu."lastName" FROM public."TB_TR_PRODUK_SISWA" tps inner join public."TB_MD_USER" tmu on tps."userId" = tmu.id where tps."isDeleted" = false and tmu."isDeleted" = false ';
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

export const createProdukSiswa = async (req, res) => {
  const response = new Object();
  try {
    let payload = req.body;
    payload.tanggalProduk = new Date().toDateString(); 
    payload.createdAt = new Date().toDateString();
    payload.updatedAt = new Date().toDateString();
    payload.isDeleted = false;
    const result = await ProdukSiswa.create(payload);
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
export const updateProdukSiswa = async (req, res) => {
  const response = new Object();
  try {
    let payload = req.body;
    payload.updatedAt = new Date().toDateString();
    const result = await ProdukSiswa.update(payload, {
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

export const deleteProdukSiswa = async (req, res) => {
    const response = new Object();
    try {
      let payload ={
        deletedAt: new Date().toDateString(),
        isDeleted: true
      }
      const result = await ProdukSiswa.update(payload, {
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
export const getProdukSiswaById = async (req, res) => {
  try {
    const response = await ProdukSiswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
