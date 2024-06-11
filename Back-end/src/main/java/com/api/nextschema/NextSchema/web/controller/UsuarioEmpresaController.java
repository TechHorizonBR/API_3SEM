package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioCreateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarioEmpresa")
@RequiredArgsConstructor
@CrossOrigin("*")

public class UsuarioEmpresaController {
    private final UsuarioEmpresaService usuarioEmpresaService;

    @Operation(
            summary = "Criar usuário.",
            description = "Cria um usuário com os campos nome, email, senha e roleUsuario, sendo que roleUsuario pode aceitar ROLE_ADMIN, ROLE_LD, ROLE_BRONZE ou ROLE_SILVER. Retorna um UsuárioDTO.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioCreateDTO.class)))
            }
    )

    @PostMapping()
    public ResponseEntity<UsuarioEmpresa> create(@RequestBody UsuarioEmpresa usuarioEmpresa) {
        UsuarioEmpresa novoRegistro = usuarioEmpresaService.criarRegistro(usuarioEmpresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRegistro);
    }

    @Operation(
            summary = "Deletar usuárioEmpresa.",
            description = "Recebe um id pelo Path e deleta o usuárioEmpresa com este ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "UsuárioEmpresa deletado com sucesso.",
                            content = @Content(mediaType = "application/json"))

            }
    )

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistroPorId(@PathVariable Long id) {
        usuarioEmpresaService.deleteRegistroPorId(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Buscar usuárioEmpresa pelo id de Empresa.",
            description = "Recebe um id pelo path e retorna um objeto UsuarioEmpresa",
            responses = {
                    @ApiResponse(responseCode = "200", description = "UsuárioEmpresa localizado com sucesso.",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "Não foi possível localizar o usuárioEmpresa.",
                            content = @Content(mediaType = "application/json"))
            }
    )

    @GetMapping("/empresa/{id}")
    public ResponseEntity<List<Long>> buscarUsuariosPorEmpresa(@PathVariable Long id) {
        List<Long> usuarios = usuarioEmpresaService.buscarUsuariosPorEmpresa(id);
        return ResponseEntity.ok(usuarios);
    }

    @Operation(
            summary = "Buscar usuárioEmpresa pelo id de Usuario.",
            description = "Recebe um id pelo path e retorna um objeto UsuarioEmpresa",
            responses = {
                    @ApiResponse(responseCode = "200", description = "UsuárioEmpresa localizado com sucesso.",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "Não foi possível localizar o usuárioEmpresa.",
                            content = @Content(mediaType = "application/json"))
            }
    )

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<EmpresaResponseDTO>> buscarEmpresaPorUsuario(@PathVariable Long id) {
        List<EmpresaResponseDTO> empresasDTO = usuarioEmpresaService.buscarEmpresasPorUsuario(id);
        return ResponseEntity.ok(empresasDTO);
    }

}