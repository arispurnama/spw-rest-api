import {Sequelize} from "sequelize"

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('SPW', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port:5434
});
export const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;