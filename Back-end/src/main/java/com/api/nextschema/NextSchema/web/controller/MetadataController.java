package com.api.nextschema.NextSchema.web.controller;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.MetadataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/metadatas")
@CrossOrigin("*")

public class MetadataController {
    private final MetadataService metadataService;

    @PostMapping
    public ResponseEntity<Metadata> create(@RequestBody Metadata metadada){
        Metadata newMetadata = metadataService.criarMetadata(metadada);
        return ResponseEntity.ok().body(newMetadata);
    }
    @GetMapping
    public ResponseEntity<List<Metadata>> getAll(){
        return ResponseEntity.ok().body(metadataService.buscarMetadata());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        metadataService.deleteporId(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Metadata> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(metadataService.buscarPorId(id));
    }
    @GetMapping("/usuario")
    public ResponseEntity<Metadata> getByUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(metadataService.buscarPorUsuario(usuario));
    }
}