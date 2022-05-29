import dotenv from "dotenv";
dotenv.config();

export default {
    port: parseInt(String(process.env.PORT)),
    mySqlHost: process.env.MY_SQL_HOST,
    mySqlDatabaseName: String(process.env.MY_SQL_DATABASE),
    mysqlPort: parseInt(String(process.env.MY_SQL_PORT)),
    mySqlUser: String(process.env.MY_SQL_USER),
    mySqlPassword: String(process.env.MY_SQL_PASSWORD),
    refreshTokens: [] as string[],
};
