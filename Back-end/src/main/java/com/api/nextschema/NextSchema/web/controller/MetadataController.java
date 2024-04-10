package com.api.nextschema.NextSchema.web.controller;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.MetadataService;
import com.api.nextschema.NextSchema.web.dto.MetadataCreateDto;
import com.api.nextschema.NextSchema.web.dto.MetadataResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.MetadataMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
<<<<<<< HEAD
@RequestMapping("/metadata")
@CrossOrigin("*")
=======
@RequestMapping("/metadatas")
@CrossOrigin("*")

>>>>>>> dev-back
public class MetadataController {
    private final MetadataService metadataService;

    @PostMapping
<<<<<<< HEAD
    public ResponseEntity<Metadata> createMetadata(@RequestBody Metadata metadada){
        Metadata newMetadata = metadataService.criarMetadata(metadada);

        return ResponseEntity.ok().body(newMetadata);
=======
    public ResponseEntity<MetadataResponseDto> create(@RequestBody MetadataCreateDto metadadaCreateDto){
        Metadata metadata = metadataService.create(MetadataMapper.toMetadata(metadadaCreateDto));
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadadaCreateDto));
>>>>>>> dev-back
    }
    @GetMapping
    public ResponseEntity<List<Metadata>> getAll(){
        return ResponseEntity.ok(metadataService.find());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        metadataService.deletebyId(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Metadata> getById(@PathVariable Long id) {
        return ResponseEntity.ok().body(metadataService.findbyId(id));
    }
<<<<<<< HEAD
    @PostMapping("/usuario")
    public ResponseEntity<List<Metadata>> getByUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(metadataService.buscarPorUsuario(usuario));
=======
    @GetMapping("/usuario")
    public ResponseEntity<Metadata> getByUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(metadataService.findbyUsuario(usuario));
>>>>>>> dev-back
    }
}