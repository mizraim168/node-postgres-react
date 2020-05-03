CREATE DATABASE app;

-- Users Table
CREATE TABLE users(
	_id SERIAL PRIMARY KEY,
	username VARCHAR (30) UNIQUE NOT NULL,
  email VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (30) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert data on users
INSERT INTO users(username, email, password) VALUES ('mizraim', 'mizraim@gmail.com', 'pass');
