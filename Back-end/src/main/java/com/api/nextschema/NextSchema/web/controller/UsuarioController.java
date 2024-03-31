package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( value ="/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;
    @GetMapping(value = "/{id}")
    ResponseEntity<Object> getUsuarioById(@PathVariable Long id){
        UsuarioDTO dto = new UsuarioDTO(usuarioService.findById(id));
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
    @GetMapping
    List<UsuarioDTO>  getAllUsuario(){
        return usuarioService.findAll();
    }

    @GetMapping(value ="/procurar")
    ResponseEntity<Object> getByNome(@RequestBody UsuarioDTO usuarioDTO){
        UsuarioDTO dto = usuarioService.findUsuarioByEmail(usuarioDTO.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
    @PostMapping
    ResponseEntity<Object> createUser(@RequestBody Usuario usuario){
        try{
            usuarioService.criarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso.");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Falha ao salvar, email já cadastrado.");
        }
    }

    @DeleteMapping
    ResponseEntity<String> deleteUsuario(@RequestBody Usuario usuario){
        try {
            usuarioService.deletarUsuario(usuario.getId());
            return  ResponseEntity.status(HttpStatus.OK).body("Usuario deletado!");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Falha ao excluir, usuário com id " + usuario.getId()+" não encontrado!");
        }
    }

    @PatchMapping(value = "/{idUsuario}")
    ResponseEntity<String> atualizarUsuario(@PathVariable Long idUsuario, @RequestBody UsuarioDTO usuarioDTO){
        try{
            usuarioService.atualizarSenha(idUsuario, usuarioDTO.getSenha());
            return ResponseEntity.status(HttpStatus.OK).body("Senha atualizada com sucesso");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
