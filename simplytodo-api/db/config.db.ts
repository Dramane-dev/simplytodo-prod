import { Sequelize } from "sequelize";
import config from "../config/defaults";

export const db = new Sequelize(config.mySqlDatabaseName, config.mySqlUser, config.mySqlPassword, {
    host: config.mySqlHost,
    dialect: "mysql",
    logging: false,
    define: {
        timestamps: false,
    },
});