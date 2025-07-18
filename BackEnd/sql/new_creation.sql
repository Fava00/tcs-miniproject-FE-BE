CREATE DATABASE IF NOT EXISTS movie_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE movie_db;

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('ADMIN', 'USER'))
);

INSERT INTO users (username, password, role) VALUES
('admin', '{noop}adminpw', 'ADMIN'),
('marci', '{noop}userpw',  'USER'),
('lora',  '{noop}userpw',  'USER');

CREATE TABLE user_favorite_movies (
    username VARCHAR(50) NOT NULL,
    movie_id BIGINT NOT NULL,
    PRIMARY KEY (username, movie_id),
    FOREIGN KEY (username) REFERENCES users(username),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);


CREATE TABLE IF NOT EXISTS genres(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE INDEX idx_genres_name ON genres(name);

INSERT INTO genres(name) VALUES
('ACTION'),
('COMEDY'),
('DRAMA'),
('HORROR'),
('ROMANCE'),
('THRILLER'),
('ADVENTURE'),
('FANTASY'),
('DOCUMENTARY'),
('CRIME'),
('ANIMATION'),
('SCIENCE FICTION');

-- DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
	id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    director VARCHAR(100) NOT NULL,
    release_year INT,
    poster_url VARCHAR(500),
    description TEXT
);

CREATE TABLE movie_genre (
	movie_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,
    PRIMARY KEY (movie_id,genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
