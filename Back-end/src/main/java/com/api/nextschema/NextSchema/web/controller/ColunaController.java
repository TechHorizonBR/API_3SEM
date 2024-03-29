package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.service.ColunaService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/colunas")
@RequiredArgsConstructor

public class ColunaController {
    private final ColunaService colunaService;

    @PostMapping
    public ResponseEntity<Coluna> createColuna(@RequestBody Coluna coluna){
        Coluna newColuna = colunaService.criarColuna(coluna);
        return ResponseEntity.ok().body(newColuna);

    }
    @GetMapping
    public ResponseEntity<List<Coluna>> getAllColunas(){
        return ResponseEntity.ok().body(colunaService.buscarColunas());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColuna(@PathVariable Long id) {
        colunaService.deleteporId(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Coluna> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(colunaService.buscarPorId(id));
    }
    @GetMapping("/metadata")
    public ResponseEntity<Coluna> getByMetadata(@RequestBody Metadata metadata){
        return ResponseEntity.ok().body(colunaService.buscarPorMetadata(metadata));
    }

}
