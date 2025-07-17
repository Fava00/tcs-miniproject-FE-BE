package com.megyed.movie_database.controller;

import com.megyed.movie_database.dto.MovieDTO;
import com.megyed.movie_database.dao.GenreRepository;
import com.megyed.movie_database.dao.MovieRepository;
import com.megyed.movie_database.entity.Genre;
import com.megyed.movie_database.entity.Movie;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/custom-movies")
public class MovieCustomController {

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    public MovieCustomController(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> getMovie(@PathVariable int id) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(mapToDTO(movie));
    }

    @GetMapping
    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<MovieDTO> createMovie(@RequestBody @Valid MovieDTO movieDTO) {
        Set<Genre> genres = genreRepository.findByNameIn(movieDTO.getGenres());

        Movie movie = new Movie();
        movie.setTitle(movieDTO.getTitle());
        movie.setReleaseYear(movieDTO.getReleaseYear());
        movie.setDirector(movieDTO.getDirector());
        movie.setDescription(movieDTO.getDescription());
        movie.setPosterURL(movieDTO.getPosterURL());
        movie.setGenres(genres);

        Movie saved = movieRepository.save(movie);
        return ResponseEntity.ok(mapToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable int id, @RequestBody @Valid MovieDTO movieDTO) {
        Movie movie = movieRepository.findById(id).orElseThrow(()
        -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Can not found movie"));

        if(movieDTO.getGenres() != null && !movieDTO.getGenres().isEmpty() && movieDTO.getGenres().size() > 2) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Genres can't be modified");
        }

        Set<Genre> genres = genreRepository.findByNameIn(movieDTO.getGenres());

        // Mezők frissítése
        movie.setTitle(movieDTO.getTitle());
        movie.setReleaseYear(movieDTO.getReleaseYear());
        movie.setDirector(movieDTO.getDirector());
        movie.setDescription(movieDTO.getDescription());
        movie.setPosterURL(movieDTO.getPosterURL());
        movie.setGenres(genres);

        Movie saved = movieRepository.save(movie);
        return ResponseEntity.ok(mapToDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MovieDTO> deleteMovie(@PathVariable int id) {
        if(!movieRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Can not found movie");
        }
        movieRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<MovieDTO> deleteAllMovies() {
        movieRepository.deleteAll();
        return ResponseEntity.noContent().build();
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

