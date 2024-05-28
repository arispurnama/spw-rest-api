import Sequelize from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const Role = db.define('TB_MD_ROLE', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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

export default Role;
(async () => {
    await db.sync();
})();