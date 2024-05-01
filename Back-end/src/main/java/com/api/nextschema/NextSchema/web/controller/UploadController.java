package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Upload", description = "Contém métodos relacionados a upload de arquivo CSV.")
public class UploadController {
    private static final long MAX_FILE_SIZE_BYTES = 1024L * 1024L * 1024L;
    @Operation(
            summary = "Recurso responsável por realizar o upload de arquivo CSV, retornando uma lista de nome de colunas e exemplo de dados.",
            description = "Recurso para Upload",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Upload realizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Object.class))),
                    @ApiResponse(responseCode = "400", description = "Tamanho do arquivo excedido.",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
            }
    )
    @PostMapping
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("header") Boolean hasHeader){
        if(file.isEmpty()){
            return ResponseEntity.badRequest().body("Arquivo não pode estar vazio");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            return ResponseEntity.badRequest().body("O tamanho do arquivo excede o limite permitido de 1 GB");
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
