package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.service.ColunaService;
import com.api.nextschema.NextSchema.web.dto.ColunaCreateDto;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateChavePrimariaDTO;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateDto;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.ColunaMapper;
import com.api.nextschema.NextSchema.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@Controller
@RequestMapping("/colunas")
@RequiredArgsConstructor
@CrossOrigin("*")
@Tag(name = "Colunas", description = "Contém todas as operações relativas aos recursos para cadastro, edição e leitura de uma coluna.")
public class ColunaController {
    private final ColunaService colunaService;

    @Operation(
            summary = "Criar uma nova coluna.",
            description = "Recurso para criar uma nova coluna",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Recursos criados com sucesso",
                            content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ColunaResponseDto.class)))),
                    @ApiResponse(responseCode = "400", description = "Nome da coluna não pode ser nulo.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "400", description = "O tamanho de nome não pode ser menor que 1 caracteres e maior que 30 caracteres.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "400", description = "Metadata não pode ser nulo.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            }
    )
    @PostMapping
    public ResponseEntity<List<ColunaResponseDto>> create(@Valid @RequestBody List<ColunaCreateDto> createDtos){
        List<ColunaResponseDto> colunasCriadas = new LinkedList<>();

        for(ColunaCreateDto coluna : createDtos){
            Coluna colunaCriada = colunaService.criarColuna(ColunaMapper.toColuna(coluna));
            colunasCriadas.add(ColunaMapper.toDto(colunaCriada));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(colunasCriadas);
    }

    @Operation(
            summary = "Buscar uma coluna.",
            description = "Recurso para buscar uma coluna.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Colunas listadas.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @GetMapping
    public ResponseEntity<List<ColunaResponseDto>> getAll(){
        List<Coluna> colunas = colunaService.buscarColunas();
        return ResponseEntity.ok(ColunaMapper.toListDto(colunas));
    }

    @Operation(
            summary = "Deletar uma coluna.",
            description = "Recurso para deletar uma coluna.",
            responses = {
                    @ApiResponse(responseCode = "204 No Content", description = "Recurso deletado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        colunaService.deleteporId(id);
        return ResponseEntity.noContent().build();
    }
    @Operation(
            summary = "Buscar por id.",
            description = "Recurso para buscar uma coluna por id.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso buscado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ColunaResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(ColunaMapper.toDto(colunaService.buscarPorId(id)));
    }

    @Operation(
            summary = "Buscar por metadata.",
            description = "Recurso para buscar uma coluna por metadata.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Colunas encontradas com sucesso..",
                            content = @Content(mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ColunaResponseDto.class)))),
                    @ApiResponse(responseCode = "404", description = "Id metadata inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @GetMapping("/metadata/{id}")
    public ResponseEntity<List<ColunaResponseDto>> getByMetadata(@PathVariable Long id) {
        return ResponseEntity.ok().body(ColunaMapper.toListDto(colunaService.buscarPorMetadata(id)));
    }
    @Operation(
            summary = "Atualizar uma lista de colunas",
            description = "Recurso criado para atualizar colunas",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Colunas atualizadas com sucesso.",
                            content = @Content(mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ColunaResponseDto.class)))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @PutMapping("/update")
    public ResponseEntity<List<ColunaResponseDto>> updateColunas(@RequestBody List<ColunaUpdateDto> colunasDto){
        List<Coluna> listColunasAtualizadas = new ArrayList<>();
        for(ColunaUpdateDto coluna : colunasDto) {
            Coluna colunaAtualizada = colunaService.atualizarColuna(coluna);
            listColunasAtualizadas.add(colunaAtualizada);
        }
        return ResponseEntity.status(HttpStatus.OK).body(ColunaMapper.toListDto(listColunasAtualizadas));
    }
    @Operation(
            summary = "Atualizar chave primária.",
            description = "Recurso para atualizar uma chave primária.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Recurso atualizado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @PatchMapping("/update")
    public ResponseEntity<ColunaResponseDto> updateChavePrimaria(@RequestBody ColunaUpdateChavePrimariaDTO colunaUpdateChavePrimariaDTO){
        return ResponseEntity.status(HttpStatus.OK).body(ColunaMapper.toResponseDto(colunaService.atualizarChavePrimaria(colunaUpdateChavePrimariaDTO)));
    }


    @PatchMapping("/update/ativo")
    public ResponseEntity<ColunaResponseDto> updateAtivo(@RequestBody ColunaUpdateAtivoDTO colunaUpdateAtivoDTO){
        return ResponseEntity.status(HttpStatus.OK).body(ColunaMapper.toResponseDto(colunaService.atualizarAtivo(colunaUpdateAtivoDTO)));
    }
  
    @Operation(
            summary = "Atualizar atributo de validação.",
            description = "Recurso para atualizar uma validação da coluna.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Recurso atualizado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @PatchMapping("/update/validado")
    public ResponseEntity<ColunaResponseDto> updateValidado(@RequestBody ColunaUpdateBronzeDto colunaUpdateValidadoDto){
        return ResponseEntity.status(HttpStatus.OK).body(ColunaMapper.toDto(colunaService.validarColuna(colunaUpdateValidadoDto)));
    }
    @Operation(
            summary = "Atualizar uma lista de colunas para usuário Bronze",
            description = "Recurso criado para atualizar colunas para usuário Bronze",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Colunas atualizadas com sucesso.",
                            content = @Content(mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = ColunaResponseDto.class)))),
                    @ApiResponse(responseCode = "404", description = "Id coluna inválido",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ColunaResponseDto.class)))
            }
    )
    @PutMapping("/update/bronze")
    public ResponseEntity<List<ColunaResponseDto>> updateColunasBronze(@RequestBody List<ColunaUpdateBronzeDto> colunasDto){
        List<Coluna> listColunasAtualizadasBronze = new ArrayList<>();
        for(ColunaUpdateBronzeDto coluna : colunasDto) {
            Coluna colunaAtualizadaBronze = colunaService.atualizarColunaBronze(coluna);
            listColunasAtualizadasBronze.add(colunaAtualizadaBronze);
        }
        return ResponseEntity.status(HttpStatus.OK).body(ColunaMapper.toListDto(listColunasAtualizadasBronze));
    }

}
