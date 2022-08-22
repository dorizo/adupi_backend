import { Sequelize } from "sequelize";

const db = new Sequelize('adupi', 'root', '', {
    host: "localhost",
    dialect: "mariadb"
});
 
export default db;
