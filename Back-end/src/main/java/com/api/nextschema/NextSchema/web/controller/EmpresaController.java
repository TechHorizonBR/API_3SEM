package com.api.nextschema.NextSchema.web.controller;


import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.service.EmpresaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/empresas")
@CrossOrigin("*")

public class EmpresaController {
    private final EmpresaService empresaService;
    @PostMapping
    public ResponseEntity<Empresa> create (@RequestBody Empresa empresa){
        return ResponseEntity.ok(empresaService.criar(empresa));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getbyID(@PathVariable Long id){
        return ResponseEntity.ok().body((empresaService.buscarId(id)));
    }
    @GetMapping
    public ResponseEntity<List<Empresa>> getAll(){
        return ResponseEntity.ok(empresaService.buscarTodos());
        }

    @GetMapping("/cnpj")
    public ResponseEntity<Empresa> getbyCNPJ(@RequestBody String cnpj){
        return ResponseEntity.ok().body(empresaService.buscarCNPJ(cnpj));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        empresaService.deleteId(id);
        return ResponseEntity.noContent().build();
    }

}

