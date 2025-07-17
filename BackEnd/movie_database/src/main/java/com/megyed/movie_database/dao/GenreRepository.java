package com.megyed.movie_database.dao;

import com.megyed.movie_database.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Set;

@RepositoryRestResource(path = "genres")
public interface GenreRepository extends JpaRepository<Genre, Integer> {
    Set<Genre> findByNameIn(List<String> names);

}
