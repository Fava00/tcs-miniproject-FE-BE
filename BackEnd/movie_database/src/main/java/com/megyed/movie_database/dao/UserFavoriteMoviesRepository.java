package com.megyed.movie_database.dao;

import com.megyed.movie_database.entity.UserFavoriteMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFavoriteMoviesRepository extends JpaRepository<UserFavoriteMovie, Integer> {
    List<UserFavoriteMovie> findByUsername(String username);
    boolean existsByUsernameAndMovieId(String username, int movieId);
    void deleteByUsernameAndMovieId(String username, int movieId);
}
