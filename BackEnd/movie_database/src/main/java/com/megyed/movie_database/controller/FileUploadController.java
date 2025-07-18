package com.megyed.movie_database.controller;

import com.megyed.movie_database.service.FileStorageService;
import com.megyed.movie_database.util.SessionUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private FileStorageService fileStorageService;

    public FileUploadController(FileStorageService fileStorServ){
        this.fileStorageService = fileStorServ;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file")MultipartFile file, HttpSession session){
        if (!SessionUtil.hasRole(session, "ADMIN", "USER")){
           return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error","You do not have permission"));
        }
        if(file.isEmpty()){
            System.out.println("not here");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Please select a file"));
        }
        System.out.println("here");
        try{
            String fileName = "";
            System.out.print(fileName +"asd");
            fileName = fileStorageService.storeFile(file);
            String fileUrl = "/api/files" + fileName;

            System.out.println("now+"+fileName);

            Map<String, String> response = new HashMap<>();
            response.put("fileName", fileName);
            response.put("fileUrl", fileUrl);
            response.put("message", "File uploaded successfully");

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Could not upload file"));
        }
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
