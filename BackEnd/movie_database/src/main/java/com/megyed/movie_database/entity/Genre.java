package com.megyed.movie_database.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "genres", uniqueConstraints = @UniqueConstraint(name = "unique_genre_name", columnNames = {"name"}))
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, unique = true, length = 50)
    private String name;

    @ManyToMany(mappedBy = "genres")
    //@Column(name = "movies")
    private Set<Movie> movies = new HashSet<>();

    public Genre() {}

    public Genre(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }
}
