package com.megyed.movie_database.controller;

import com.megyed.movie_database.dao.AppUserRepository;
import com.megyed.movie_database.dto.RegistrationRequest;
import com.megyed.movie_database.entity.AppUser;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AppUserRepository userRepository;

    AuthController(AppUserRepository userRepo){
        this.userRepository = userRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest req) {
        if ("admin".equalsIgnoreCase(req.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("This username is forbidden");
        }
        if(userRepository.existsByUsername(req.getUsername())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already taken");
        }
        AppUser newUser = new AppUser();
        newUser.setUsername(req.getUsername());
        newUser.setRole("USER");
        newUser.setPassword("{noop}" + req.getPassword()); //TODO: teszthez. Bcrypt élesben!
        userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegistrationRequest req, HttpSession session) {
        Optional<AppUser> userOpt = userRepository.findByUsername(req.getUsername());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals("{noop}" + req.getPassword())) {
            AppUser user = userOpt.get();
            session.setAttribute("currentUser", user.getUsername());
            session.setAttribute("currentRole", user.getRole());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong data!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
