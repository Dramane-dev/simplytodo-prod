DROP DATABASE IF EXISTS simplytodo;
CREATE DATABASE IF NOT EXISTS simplytodo;

USE simplytodo;

CREATE TABLE users(
    userId VARCHAR(16) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    mailVerificationCode VARCHAR(30),
    mailConfirmed BOOLEAN DEFAULT FALSE,
    isAuthenticated BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE project(
    projectId VARCHAR(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    userId VARCHAR(16),
    PRIMARY KEY(projectId),
    FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE task(
    id VARCHAR(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    status VARCHAR(20) DEFAULT "todo",
    created_at VARCHAR(255),
    projectId VARCHAR(16),
    PRIMARY KEY(id),
    FOREIGN KEY(projectId) REFERENCES project(projectId) ON DELETE CASCADE
);