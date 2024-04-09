package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping( value ="/usuarios")
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;
    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<UsuarioDTO>> findUsuarioById(@PathVariable Long id){
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findById(id));
    }
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> getAllUsuario(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
    }

    @GetMapping(value ="/{email}")
    public ResponseEntity<UsuarioDTO> getByEmail(@PathVariable String email ){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findUsuarioByEmail(email));
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

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id){
        usuarioService.deletarUsuario(id);
        return  ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping
    public ResponseEntity<Void> atualizarSenha(@RequestBody UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO){
            usuarioService.atualizarSenha(usuarioAlterarSenhaDTO);
            return ResponseEntity.status(HttpStatus.OK).build();

    }

    @PutMapping
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(@RequestBody UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO){

        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.atualizarUsuario(usuarioAtualizaDadosDTO));
    }
}
