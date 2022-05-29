import { db } from "../../db/config.db";
import { DataTypes } from "sequelize";
import { Task } from "./Task.model";
import { User } from "./User.model";

const Project = db.define(
    "project",
    {
        projectId: {
            type: DataTypes.UUID,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "userId",
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Project.hasMany(Task, { as: "tasks", foreignKey: "projectId", onDelete: "cascade", onUpdate: "cascade" });
Task.belongsTo(Project, { as: "project", foreignKey: "projectId" });

export { Project };
