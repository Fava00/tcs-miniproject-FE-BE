package com.megyed.movie_database.service;

import com.megyed.movie_database.exception.FileStorageException;
import com.megyed.movie_database.exception.ResourceNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    public FileStorageService(){
        this.fileStorageLocation = Paths.get("uploads")
                .toAbsolutePath().normalize();
        try{
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory", ex);
        }
    }

    public String storeFile(MultipartFile file){
        if(file.isEmpty()){
            throw new FileStorageException("Can not store empty file");
        }
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try{
            if(fileName.contains("..")){
                throw new FileStorageException("Invalid file name: "+fileName);
            }
            String uniqueFileName = System.currentTimeMillis() + "_" + fileName;
            Path targetLocation = this. fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println(uniqueFileName);
            return  uniqueFileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file "+ fileName, ex);
        }
    }

    public Resource loadFileAsResource(String fileName){
        try{
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()){
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found: "+fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileStorageException("File not found:"+ fileName, ex);
        }
    }
}
