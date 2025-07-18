package com.megyed.movie_database.rest;

import com.megyed.movie_database.entity.Genre;
import com.megyed.movie_database.entity.Movie;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

public class RestConfiguration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration config,
            CorsRegistry cors
    ){

        config.exposeIdsFor(Movie.class);
        config.exposeIdsFor(Genre.class);

        cors.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);

    }
}
