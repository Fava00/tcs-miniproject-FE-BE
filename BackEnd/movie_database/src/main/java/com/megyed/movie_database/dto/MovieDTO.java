package com.megyed.movie_database.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

public class MovieDTO {
    private int id;

    private String title;

    private int releaseYear;

    private String director;

    private String description;

    private String posterURL;

    @Size(max = 3, message = "Maximum 3 műfaj választható egy filmhez!")
    private List<String> genres;

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public String getDirector() {
        return director;
    }

    public String getPosterURL() {
        return posterURL;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public void setPosterURL(String posterURL) {
        this.posterURL = posterURL;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
}
