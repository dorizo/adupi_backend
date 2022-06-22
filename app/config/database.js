import { Sequelize } from "sequelize";

const db = new Sequelize('', '', '', {
    host: "",
    dialect: "mysql"
});
 
export default db;
