package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarioEmpresa")
@RequiredArgsConstructor

public class UsuarioEmpresaController {
    private final UsuarioEmpresaService usuarioEmpresaService;
    @PostMapping()
    public ResponseEntity<UsuarioEmpresa> create(@RequestBody UsuarioEmpresa usuarioEmpresa) {
        UsuarioEmpresa novoRegistro = usuarioEmpresaService.criarRegistro(usuarioEmpresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRegistro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistroPorId(@PathVariable Long id) {
        usuarioEmpresaService.deleteRegistroPorId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/empresa/{id}")
    public ResponseEntity<List<Long>> buscarUsuariosPorEmpresa(@PathVariable Long id) {
        List<Long> usuarios = usuarioEmpresaService.buscarUsuariosPorEmpresa(id);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Long>> buscarEmpresaPorUsuario(@PathVariable Long id) {
        List<Long> empresas = usuarioEmpresaService.buscarEmpresasPorUsuario(id);
        return ResponseEntity.ok(empresas);
    }
}