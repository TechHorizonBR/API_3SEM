package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.service.UsuarioService;
import com.api.nextschema.NextSchema.web.dto.AuthenticationDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioCreateDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO authenticationDTO) {
        var emailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.password());
        var auth = this.authenticationManager.authenticate(emailPassword);
        return ResponseEntity.ok().build();
    }

}
