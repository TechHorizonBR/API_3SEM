package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.DownloadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@RestController
@RequestMapping( value ="/download")
@CrossOrigin("*")
public class DownloadController {
    @Autowired
    private DownloadService downloadService;

    @GetMapping("/yaml/{metadataId}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable Long metadataId) throws IOException {
        // Defina os headers da resposta
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=schemaLandingZone.yaml");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/x-yaml");

        return new ResponseEntity<>(downloadService.downloadYamlLZ(metadataId), headers, HttpStatus.OK);
    }
}
