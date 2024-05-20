import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./Users.js";
const {DataTypes} = Sequelize;

const GaleriBerita = db.define('TB_TR_GALERI_BERITA', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    judulBerita: {
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

Users.hasMany(GaleriBerita,{
    foreignKey: 'userId'
});

export default GaleriBerita;
(async () => {
    await db.sync();
})();