package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.TokenService;
import com.api.nextschema.NextSchema.web.dto.AuthenticationDTO;
import com.api.nextschema.NextSchema.web.dto.LoginResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;
    @CrossOrigin("*")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO authenticationDTO) {

        var emailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.senha());
        var auth = this.authenticationManager.authenticate(emailPassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

}
