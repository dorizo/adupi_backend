import { Sequelize } from "sequelize";

const db = new Sequelize('adupi', 'dorizo', 'password', {
    host: "165.22.244.130",
    dialect: "mysql"
});
 
export default db;
