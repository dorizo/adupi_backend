import { Sequelize } from "sequelize";

// const db = new Sequelize('heroku_0571f51faddc42c', 'b7c30e98b6e0cc', 'c09deb71', {
//     host: "us-cdbr-east-05.cleardb.net",
//     dialect: "mysql"
// });

const db = new Sequelize('adupi', 'root', '', {
const db = new Sequelize('adupi', 'root', 'citm0029', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;
