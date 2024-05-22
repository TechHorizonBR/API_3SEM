package com.api.nextschema.NextSchema.web.controller;


import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.service.EmpresaService;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import com.api.nextschema.NextSchema.web.dto.EmpresaAtualizarDto;
import com.api.nextschema.NextSchema.web.dto.EmpresaCreateDTO;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import com.api.nextschema.NextSchema.web.dto.mapper.EmpresaMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/empresas")
@CrossOrigin("*")
@Tag(name = "Empresas", description = "Contém todas as operações relativas aos recursos para cadastro, edição e leitura de uma empresa.")

public class EmpresaController {
    private final EmpresaService empresaService;


    @Operation(
            summary = "Criar uma nova enmpresa.",
            description = "Recurso para criar uma nova empresa",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso criado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = EmpresaCreateDTO.class)))
            }
    )
    @PostMapping
    public ResponseEntity<EmpresaResponseDTO> create (@RequestBody EmpresaCreateDTO empresaCreateDTO){
        Empresa newEmpresa = empresaService.criar(EmpresaMapper.toEmpresa(empresaCreateDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(EmpresaMapper.toDto(newEmpresa));
    }

    @Operation(
            summary = "Buscar empresa por id.",
            description = "Recurso para trazer id de empresas ",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Empresa localizada com sucesso.",
                            content = @Content(mediaType = "application/json"))
            }
    )

        @GetMapping("/{id}")
        public ResponseEntity<EmpresaResponseDTO> getbyID(@PathVariable Long id){
            return ResponseEntity.ok().body(EmpresaMapper.toDto(empresaService.buscarId(id)));
        }

    @Operation(
            summary = "Listar empresas.",
            description = "Retorna uma Lista de EmpresaResponseDTO",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso.",
                            content = @Content(mediaType = "application/json",  schema = @Schema(implementation = EmpresaResponseDTO.class)))
            }
    )
    @GetMapping
    public ResponseEntity<List<EmpresaResponseDTO>> getAll(){
        List<Empresa> empresas = empresaService.buscarTodos();
       return ResponseEntity.ok(EmpresaMapper.toListDto(empresas));
        }

    @Operation(
            summary = "Listar empresas por cnpj.",
            description = "Retorna uma empresa pelo EmpresaDTO",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso.",
                            content = @Content(mediaType = "application/json"))
            }
    )

    @GetMapping("/cnpj/{cnpj}")
    public ResponseEntity<EmpresaResponseDTO> getbyCNPJ(@PathVariable String cnpj){
        return ResponseEntity.status(HttpStatus.OK).body(EmpresaMapper.toDto(empresaService.buscarCNPJ(cnpj)));
    }

    @Operation(
            summary = "Deletar empresa.",
            description = "Recebe um id de empresa e a deleta.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Usuário cadastrado com sucesso.",
                            content = @Content(mediaType = "application/json"))
            }
    )

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        empresaService.deleteId(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping ()
    public ResponseEntity<EmpresaResponseDTO> atulizarEmpresa(@RequestBody EmpresaAtualizarDto empresa){
        return ResponseEntity.status(HttpStatus.OK).body(EmpresaMapper.toDto(empresaService.atualizarEmpresa(empresa)));
    }

}

