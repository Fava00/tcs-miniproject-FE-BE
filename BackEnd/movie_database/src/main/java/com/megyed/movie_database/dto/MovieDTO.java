package com.megyed.movie_database.dto;

import jakarta.validation.constraints.*;

import java.util.List;

public class MovieDTO {
    private int id;

    @NotNull(message = "Title cannot be null")
    private String title;

    @Min(value = 1888, message = "Release year must be at least 1888")
    @Max(value = 2100, message = "Release year must be at most 2100")
    private int releaseYear;

    @NotNull(message = "Director cannot be null")
    @NotBlank(message = "Director cannot be blank")
    private String director;

    @Size(max = 1000, message = "Description must be at most 1000 characters")
    private String description;


    private String posterURL;

    @Size(max = 2, message = "You can select a maximum of 2 genres!")
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
