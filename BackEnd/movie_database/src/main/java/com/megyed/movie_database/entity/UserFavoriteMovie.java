package com.megyed.movie_database.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_favorite_movie")
public class UserFavoriteMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private int movieId;

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
