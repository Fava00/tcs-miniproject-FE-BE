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

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file")MultipartFile file, HttpSession session){
        if (!SessionUtil.hasRole(session, "ADMIN", "USER")){
           return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error","You do not have permission"));
        }
        try{
            String fileName = fileStorageService.storeFile(file);
            String fileUrl = "/api/files" + fileName;

            Map<String, String> response = new HashMap<>();
            response.put("fileName", fileName);
            response.put("fileUrl", fileUrl);
            response.put("message", "File uploaded successfully");

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
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
