package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping( value ="/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;
    @GetMapping(value = "procurar/{id}")
    public ResponseEntity<Optional<UsuarioDTO>> findUsuarioById(@PathVariable Long id){
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findById(id));
    }
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getAllUsuario(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
    }

    @GetMapping(value ="/procurar")
    public ResponseEntity<UsuarioDTO> getByEmail(@RequestBody UsuarioBuscaEmailDTO usuarioBuscaEmailDTO ){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findUsuarioByEmail(usuarioBuscaEmailDTO.getEmail()));
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

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> createUser(@RequestBody UsuarioCreateDTO usuarioCreateDTO){

            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.criarUsuario(usuarioCreateDTO));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUsuario(@RequestBody UsuarioBuscaIdDTO usuarioBuscaIdDTO){
        usuarioService.deletarUsuario(usuarioBuscaIdDTO.getId());
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping
    public ResponseEntity<Void> atualizarSenha(@RequestBody UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO){
            usuarioService.atualizarSenha(usuarioAlterarSenhaDTO);
            return ResponseEntity.status(HttpStatus.OK).build();

    }

    @PutMapping
    public ResponseEntity<String> atualizarUsuario(@RequestBody UsuarioDTO usuarioNovosDados){
        try{
            Usuario usuario = new Usuario(usuarioNovosDados);
            usuarioService.atualizarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.OK).body("Cadastro atualizado com sucesso");

        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao atualizar usuario. " + e.getMessage());
        }
    }
}
