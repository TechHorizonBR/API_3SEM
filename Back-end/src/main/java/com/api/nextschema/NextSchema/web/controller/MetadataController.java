package com.api.nextschema.NextSchema.web.controller;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.MetadataService;
import com.api.nextschema.NextSchema.web.dto.MetadataCreateDto;
import com.api.nextschema.NextSchema.web.dto.MetadataResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.MetadataMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/metadata")
@CrossOrigin("*")
@Tag(name = "Metadatas", description = "Endpoints para fazer as operações com metadatas.")
public class MetadataController {
    private final MetadataService metadataService;

    @Operation(
            summary = "Criar metadata.",
            description = "Cria um novo metadata passando os parâmetros",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Metadata criado!",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = MetadataResponseDto.class)))
            }
    )
    @PostMapping
    public ResponseEntity<MetadataResponseDto> create(@RequestBody MetadataCreateDto metadadaCreateDto){
        Metadata metadata = metadataService.create(MetadataMapper.toMetadata(metadadaCreateDto));
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadata));
    }

    @Operation(
            summary = "Listar metadatas",
            description = "Lista todos os metadatas existentes",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Metadatas listados",
                        content = @Content(mediaType = "application/json", array = @ArraySchema()))
            }
    )
    @GetMapping
    public ResponseEntity<List<MetadataResponseDto>> getAll(){
       List<Metadata> metadatas = metadataService.find();
        return ResponseEntity.ok().body(MetadataMapper.toListDto(metadatas));
    }
    @Operation(
            summary = "Deletar metadata por id",
            description = "Endpoint para deletar o metadata passando um id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Metadata deletado",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            }
    )

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        metadataService.deletebyId(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Buscar metadata",
            description = "Buscar metadata passando um id específico",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Metadata encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MetadataResponseDto.class)))
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<MetadataResponseDto> getById(@PathVariable Long id) {
        Metadata metadata = metadataService.findbyId(id);
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadata));
    }

    @Operation(
            summary = "Buscar metadata por usuário",
            description = "Retorna os metadatas por usuário",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Metadatas do usuário",
                    content = @Content(mediaType = "apllication/json", array = @ArraySchema()))
            }
    )
    @PostMapping("/usuario")
    public ResponseEntity<List<MetadataResponseDto>> getByUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok().body(MetadataMapper.toListDto(metadataService.buscarPorUsuario(usuario)));
    }
}