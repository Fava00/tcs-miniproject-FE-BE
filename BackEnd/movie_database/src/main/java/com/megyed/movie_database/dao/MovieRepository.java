package com.megyed.movie_database.dao;

import com.megyed.movie_database.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="movies")
public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
