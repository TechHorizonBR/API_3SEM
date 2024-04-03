package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.UsuarioCreateDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioResponseDTO;
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
    @GetMapping(value = "/{id}")
    ResponseEntity<Object> getUsuarioById(@PathVariable Long id){
        try {
            Optional<Usuario> usuario = usuarioService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(usuario);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao localizar usuário. " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<Object> getAllUsuario(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao localizar usuários. " + e.getMessage());
        }
    }

    @GetMapping(value ="/procurar")
    public ResponseEntity<Object> getByEmail(@RequestBody UsuarioDTO usuarioDTO){
        try {
            UsuarioDTO dto = usuarioService.findUsuarioByEmail(usuarioDTO.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao procurar usuário. " + e.getMessage());
        }
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
    public ResponseEntity<String> deleteUsuario(@RequestBody Usuario usuario){
        try {
            usuarioService.deletarUsuario(usuario.getId());
            return  ResponseEntity.status(HttpStatus.OK).body("Usuario deletado!");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Falha ao excluir, usuário com id " + usuario.getId()+" não encontrado!");
        }
    }

    @PatchMapping(value = "/{idUsuario}")
    public ResponseEntity<String> atualizarSenha(@PathVariable Long idUsuario, @RequestBody UsuarioDTO usuarioNovaSenha){
        try{
            usuarioService.atualizarSenha(idUsuario, usuarioNovaSenha.getSenha());
            return ResponseEntity.status(HttpStatus.OK).body("Senha atualizada com sucesso");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao atualizar usuario. " + e.getMessage());
        }
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
