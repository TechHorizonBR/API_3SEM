package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.dto.UsuarioDTO;
import com.api.nextschema.NextSchema.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( value ="/usuarios")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;
    @GetMapping(value = "/{id}")
    UsuarioDTO getUsuarioById(@PathVariable Long id){

        return usuarioService.findById(id);
    }
}
