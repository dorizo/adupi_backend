import { Sequelize } from "sequelize";
 
const db = new Sequelize('adupi', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;
