package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import com.api.nextschema.NextSchema.web.exception.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping( value ="/usuarios")
@CrossOrigin("*")
@Tag(name = "Usuários", description = "Endpoints para cadastrar, editar, buscar e deletar usuários.")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @Operation(
            summary = "Buscar usuário pelo id.",
            description = "Recebe um id pelo path e retorna um objeto Usuario",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Usuário localizado com sucesso.",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "Não foi possível localizar o usuário.",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioResponseDTO> findUsuarioById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(
                UsuarioMapper.toResponseDTO(usuarioService.buscarPorId(id)));
    }

    @Operation(
            summary = "Listar usuários.",
            description = "Retorna uma Lista de UsuáriosResponseDTO",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso.",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getAllUsuario(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
    }

    @Operation(
            summary = "Lista usuários por email.",
            description = "Recebe um email pelo Path e retorna um UsuárioDTO",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Busca realizada com sucesso.",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "Não foi possível localizar o usuário.",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @GetMapping(value ="/{email}")
    public ResponseEntity<UsuarioDTO> getByEmail(@PathVariable String email ){
        return ResponseEntity.status(HttpStatus.OK).body(
                UsuarioMapper.toUsuarioDTO(usuarioService.findByEmail(email)));
    }

   /* @GetMapping(value ="/empresa/{idEmpresa}")
    public ResponseEntity<Object> getUsuarioByEmpresa(@PathVariable Long idEmpresa){
        try {
            List<Usuario> listUsuarios =  usuarioService.findUsuarioByEmpresa(idEmpresa);
            return ResponseEntity.status(HttpStatus.OK).body(listUsuarios);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao localizar usuários. " + e.getMessage());
        }
    }*/


   @Operation(
           summary = "Criar usuário.",
           description = "Cria um usuário com os campos nome, email, senha e roleUsuario, sendo que roleUsuario pode aceitar ROLE_ADMIN, ROLE_LD, ROLE_BRONZE ou ROLE_SILVER. Retorna um UsuárioDTO.",
           responses = {
                   @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso.",
                           content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioCreateDTO.class)))
           }
   )
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> createUser(@Valid @RequestBody UsuarioCreateDTO usuarioCreateDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(usuarioCreateDTO));
    }

    @Operation(
            summary = "Deletar usuário.",
            description = "Recebe um id pelo Path e deleta o usuário com este ID.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Usuário cadastrado com sucesso.",
                            content = @Content(mediaType = "application/json"))
            }
    )
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id){
        usuarioService.deletarUsuario(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            summary = "Atualizar senha do usuário.",
            description = "Recebe um UsuarioAlterarSenhaDTO.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Senha atualizada com sucesso.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioAlterarSenhaDTO.class)))
            }
    )
    @PatchMapping
    public ResponseEntity<Void> atualizarSenha(@Valid @RequestBody UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO){
        usuarioService.atualizarSenha(usuarioAlterarSenhaDTO);
        return ResponseEntity.status(HttpStatus.OK).build();

    }
    @Operation(
            summary = "Atualizar dados do usuário.",
            description = "Recebe um UsuarioAlterarDadosDTO para atualizar nome, email ou role do usuário, retorna um UsuarioResponseDTO.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Senha atualizada com sucesso.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioAtualizaDadosDTO.class)))
            }
    )
    @PutMapping
    public ResponseEntity<UsuarioResponseDTO> atualizarDados(@RequestBody UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO){

        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.atualizarDados(usuarioAtualizaDadosDTO));
    }

    @Operation(
            summary = "Login do usuário.",
            description = "Recebe um UsuarioLoginDTO, retorna um UsuarioResponseDTO.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Senha atualizada com sucesso.",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioLoginDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Erro: Campo email não pode estar em branco",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),

            }
    )
    @PostMapping(value = "/login")
    public ResponseEntity<UsuarioResponseDTO> login(@Valid @RequestBody UsuarioLoginDTO userLoginDTO){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.login(userLoginDTO.getEmail(), userLoginDTO.getSenha()));
    }
}
