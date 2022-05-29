import { DataTypes } from "sequelize";
import { db } from "../../db/config.db";
import { Project } from "./Project.model";

const Task = db.define(
    "task",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        projectId: {
            type: DataTypes.UUID,
            references: {
                model: Project,
                key: "projectId",
            },
        },
    },
    {
        freezeTableName: true,
    }
);

export { Task };
