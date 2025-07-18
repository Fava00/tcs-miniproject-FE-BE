package com.megyed.movie_database.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="movies")
public class Movie {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="release_year")
    private int releaseYear;

    @Column(name="director")
    private String director;

    @ManyToMany
    @JoinTable(
            name = "movie_genre",
            joinColumns  = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    @Column(name="description")
    private String description;

    @Column(name="poster_url")
    private String posterURL;

    public Movie() {
    }

    public Movie(String title, String director) {
        this.title = title;
        this.director = director;
    }

    public Movie(String title, int releaseYear, String director, String description) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.director = director;
        this.description = description;

    }


    public Movie(Set<Genre> genres, String title, int releaseYear, String director, String description, String posterURL) {
        this.genres = genres;
        this.title = title;
        this.releaseYear = releaseYear;
        this.director = director;
        this.description = description;
        this.posterURL = posterURL;
    }

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

    public Set<Genre> getGenres() {
        return genres;
    }

    public String getDescription() {
        return description;
    }

    public String getPosterURL() {
        return posterURL;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPosterURL(String posterURL) {
        this.posterURL = posterURL;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", releaseYear=" + releaseYear +
                ", director='" + director + '\'' +
                ", genres=" + genres +
                ", description='" + description + '\'' +
                ", posterURL='" + posterURL + '\'' +
                '}';
    }
}
