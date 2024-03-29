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
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado!");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(usuarioService.criarUsuario(usuario));
        }
    }

    @DeleteMapping
    ResponseEntity<Object> deleteUsuario(@RequestBody Usuario usuario){
        try {
                usuarioService.deletarUsuario(usuario);
                return  ResponseEntity.status(HttpStatus.OK).body("Usuario deletado!");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Falha para deletar");
        }
    }
}
