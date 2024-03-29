package com.api.nextschema.NextSchema.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@Slf4j
@CrossOrigin("*")
public class UploadController {

    @PostMapping
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("header") Boolean hasHeader){
        if(file.isEmpty()){
            return ResponseEntity.badRequest().body("Arquivo não pode estar vazio");
        }
        try{
            BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));

            List<String> data = new ArrayList<>();
            String line = br.readLine();
            if(hasHeader && line != null){
                data.add(line);
                line = br.readLine();
                if(line != null){
                    data.add(line);
                }
            }else{
                String firstLine = line != null ? line : "";
                String[] columnNames = firstLine.split(",");
                StringBuilder header = new StringBuilder();
                for( int i = 0; i <columnNames.length; i++){
                    header.append("coluna").append(i+1);
                    if(i < columnNames.length -1){
                        header.append(",");
                    }
                }
                data.add(header.toString());
                if(line != null){
                    data.add(br.readLine());
                }
            }
            return ResponseEntity.ok().body(data);
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao processar o arquivo");
        }
    }
}
