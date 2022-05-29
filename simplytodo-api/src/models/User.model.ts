import { DataTypes } from "sequelize";
import { db } from "../../db/config.db";
import { Project } from "./Project.model";

export const User = db.define("user", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
    },
    mailVerificationCode: {
        type: DataTypes.STRING,
    },
    mailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isAuthenticated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.hasMany(Project, { as: "projects", foreignKey: "userId", onDelete: "cascade", onUpdate: "cascade" });
Project.belongsTo(User, { as: "user", foreignKey: "userId" });
