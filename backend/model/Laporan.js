import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
import ProdukSiswa from "./ProdukSiswa.js";
const {DataTypes} = Sequelize;

const LaporanOmzet = db.define('TB_TR_LAPORAN', {
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
    // produkId:{
    //     type: DataTypes.INTEGER,
    //     allowNull:false
    // },
    tanggalLaporan: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    jumlahOmzet: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    JumlahModal: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    buktiTransaksi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    laporanMingguan: {
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
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    freezeTableName: true
})

Users.hasMany(LaporanOmzet,{
    foreignKey: 'userId'
});
// ProdukSiswa.hasMany(LaporanOmzet, {
//     foreignKey: 'produkId'
// })
export default LaporanOmzet;
(async () => {
    await db.sync();
})();