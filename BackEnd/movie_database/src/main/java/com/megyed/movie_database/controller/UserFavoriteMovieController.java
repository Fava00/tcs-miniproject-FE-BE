package com.megyed.movie_database.controller;

import com.megyed.movie_database.dao.MovieRepository;
import com.megyed.movie_database.dao.UserFavoriteMoviesRepository;
import com.megyed.movie_database.dto.MovieDTO;
import com.megyed.movie_database.entity.Genre;
import com.megyed.movie_database.entity.Movie;
import com.megyed.movie_database.entity.UserFavoriteMovie;
import com.megyed.movie_database.util.SessionUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favorites")
public class UserFavoriteMovieController {


    private UserFavoriteMoviesRepository favoriteRepo;
    private MovieRepository movieRepo;


    public UserFavoriteMovieController(MovieRepository movieRepository, UserFavoriteMoviesRepository favRepo) {
        this.movieRepo = movieRepository;
        this.favoriteRepo = favRepo;
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<?> addFavorite(@PathVariable int movieId, HttpSession session) {
        if(!SessionUtil.hasRole(session, "USER", "ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have authority to do that");
        }
        String username = SessionUtil.getCurrentUsername(session);
        if(!movieRepo.existsById(movieId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found");
        }
        if(!favoriteRepo.existsByUsernameAndMovieId(username, movieId)){
            UserFavoriteMovie fav = new UserFavoriteMovie();
            fav.setUsername(username);
            fav.setMovieId(movieId);
            favoriteRepo.save(fav);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> deleteFavorite(@PathVariable int movieId, HttpSession session) {
        if(!SessionUtil.hasRole(session, "USER", "ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have authority to do that");
        }
        String username = SessionUtil.getCurrentUsername(session);
        favoriteRepo.deleteByUsernameAndMovieId(username,movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<MovieDTO> listFavorites(HttpSession session){
        if (!SessionUtil.hasRole(session, "USER", "ADMIN")){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have authority to do that");
        }
        String username = SessionUtil.getCurrentUsername(session);
        List<UserFavoriteMovie> favs = favoriteRepo.findByUsername(username);
        List<Integer> movieIds = favs.stream().map(UserFavoriteMovie::getMovieId).toList();
        return movieRepo.findAllById(movieIds)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private MovieDTO mapToDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setReleaseYear(movie.getReleaseYear());
        dto.setDirector(movie.getDirector());
        dto.setDescription(movie.getDescription());
        dto.setPosterURL(movie.getPosterURL());
        dto.setGenres(movie.getGenres().stream()
                .map(Genre::getName).collect(Collectors.toList()));
        return dto;
    }
}
