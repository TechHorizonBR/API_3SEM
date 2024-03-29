package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( value ="/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;
    //@GetMapping(value = "/{id}")
    UsuarioDTO getUsuarioById(@PathVariable Long id){
        return usuarioService.findById(id);
    }
    @GetMapping
    List<UsuarioDTO>  getAllUsuario(){
        return usuarioService.findAll();
    }

    @GetMapping(value ="/{nome}")
    List<UsuarioDTO> getByNome(@PathVariable String nome){

        return usuarioService.findByName(nome);
    }
}
