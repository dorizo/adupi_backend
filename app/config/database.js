import { Sequelize } from "sequelize";
 
const db = new Sequelize('heroku_0571f51faddc42c', 'b7c30e98b6e0cc1', 'c09deb71', {
    host: "us-cdbr-east-05.cleardb.net",
    dialect: "mysql"
});
 
export default db;
