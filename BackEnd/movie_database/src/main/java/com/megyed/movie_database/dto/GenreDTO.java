package com.megyed.movie_database.dto;

import java.util.List;

public class GenreDTO {

    private int id;

    private String name;

    private List<String> movies;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getMovies() {
        return movies;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMovies(List<String> movies) {
        this.movies = movies;
    }
}
