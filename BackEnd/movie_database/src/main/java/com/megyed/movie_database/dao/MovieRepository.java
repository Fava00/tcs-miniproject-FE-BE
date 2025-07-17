package com.megyed.movie_database.dao;

import com.megyed.movie_database.entity.Genre;
import com.megyed.movie_database.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Set;

@RepositoryRestResource(path="movies")
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Set<Movie> findByTitleIn(List<String> titles);
}
