import dotenv from "dotenv";
dotenv.config();

export default {
    port: parseInt(String(process.env.PORT)),
    mySqlHost: process.env.NODE_ENV !== 'production'
    ? process.env.MY_SQL_LOCALHOST
    : process.env.MY_SQL_HOST,
    mySqlDatabaseName: String(process.env.MY_SQL_DATABASE),
    mysqlPort: parseInt(String(process.env.MY_SQL_PORT)),
    mySqlUser: 
    process.env.NODE_ENV !== 'production'
    ? String(process.env.MY_SQL_LOCAL_USER)
    : String(process.env.MY_SQL_USER),
    mySqlPassword: String(process.env.MY_SQL_PASSWORD),
    refreshTokens: [] as string[],
};
