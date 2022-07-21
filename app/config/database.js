import { Sequelize } from "sequelize";

const db = new Sequelize('', '', '', {
    host: "",
    dialect: "mariadb"
});
 
export default db;
