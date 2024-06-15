package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.UploadService;
import com.api.nextschema.NextSchema.web.dto.DeParaResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.DeParaMapper;
import com.api.nextschema.NextSchema.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class UploadController {
    private final UploadService uploadService;
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
        return ResponseEntity.ok().body(uploadService.uploadFile(file, hasHeader));
    }
    @PostMapping("/dePara/{idColuna}")
    public ResponseEntity<List<DeParaResponseDto>> uploadFileDePara(@RequestParam("file") MultipartFile file, @PathVariable Long idColuna){
        return ResponseEntity.ok().body(DeParaMapper.toListDto(uploadService.uploadFileDePara(file, idColuna)));
    }
}
