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
        allowNull: false,
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    freezeTableName: true
})

export default Role;
(async () => {
    await db.sync();
})();