import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
const {DataTypes} = Sequelize;

const ProdukSiswa = db.define('TB_TR_PRODUK_SISWA', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    tanggalProduk: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    namaProduk: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    freezeTableName: true
})

Users.hasMany(ProdukSiswa,{
    foreignKey: 'userId'
});

export default ProdukSiswa;
(async () => {
    await db.sync();
})();