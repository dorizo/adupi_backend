import { Sequelize } from "sequelize";
 
const db = new Sequelize('adupi', 'root', 'citm0029', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;
