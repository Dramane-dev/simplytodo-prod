DROP DATABASE IF EXISTS todolist;
CREATE DATABASE IF NOT EXISTS todolist;

USE todolist;

CREATE TABLE users(
    userId INT NOT NULL AUTO_INCREMENT,
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
    projectId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    userId INT,
    PRIMARY KEY(projectId),
    FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE task(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    status VARCHAR(20) DEFAULT "todo",
    created_at VARCHAR(255),
    projectId INT,
    PRIMARY KEY(id),
    FOREIGN KEY(projectId) REFERENCES project(projectId) ON DELETE CASCADE
);