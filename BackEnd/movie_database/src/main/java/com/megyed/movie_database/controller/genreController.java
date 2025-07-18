package com.megyed.movie_database.controller;

import com.megyed.movie_database.dao.GenreRepository;
import com.megyed.movie_database.dao.MovieRepository;
import com.megyed.movie_database.dto.GenreDTO;
import com.megyed.movie_database.entity.Genre;
import com.megyed.movie_database.entity.Movie;
import com.megyed.movie_database.util.SessionUtil;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/genres")
public class genreController {

    private final GenreRepository genreRepo;
    private final MovieRepository movieRepo;

    public genreController (GenreRepository genreRepository, MovieRepository movieRepository){
        this.genreRepo = genreRepository;
        this.movieRepo = movieRepository;
    }

    private boolean isAllUpperCase(String name) {
        return name != null && name.matches("[A-Z]+");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGenre(@PathVariable int id, @RequestBody @Valid GenreDTO dto, HttpSession session){
        if (!SessionUtil.hasRole(session, "ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission!");
        }
        if (!isAllUpperCase(dto.getName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Genre name must be ALL UPPERCASE letters (A-Z)!");
        }
        //Only accept its own id
        if(dto.getId() != id){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID and Path-Variable do not match! Genre ID cannot be changed.");
        }

        //Check if the same name already in database
        Optional<Genre> nameConflict = Optional.ofNullable(genreRepo.findByName(dto.getName()));
        if (nameConflict.isPresent() && nameConflict.get().getId() != id) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This genre name already exists!");
        }

        Genre genre = genreRepo.findById(id).orElseThrow(()
                -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Can not found movie"));

        Set<Movie> movies = movieRepo.findByTitleIn(dto.getMovies());

        genre.setId(dto.getId());
        genre.setMovies(movies);
        genre.setName(dto.getName());

        Genre saved = genreRepo.save(genre);
        return ResponseEntity.ok(mapToDTO(saved));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGenre(@PathVariable int id, HttpSession session){
        if(!SessionUtil.hasRole(session, "ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission!");
        }
        if(!genreRepo.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Can not found movie");
        }
        genreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private GenreDTO mapToDTO(Genre genre) {
        GenreDTO dto = new GenreDTO();
        dto.setId(genre.getId());
        dto.setName(genre.getName());
        dto.setMovies(genre.getMovies().stream()
                .map(Movie::getTitle).collect(Collectors.toList()));
        return dto;
    }

}
