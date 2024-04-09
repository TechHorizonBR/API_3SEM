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
@RequestMapping("/metadatas")
@CrossOrigin("*")

public class MetadataController {
    private final MetadataService metadataService;

    @PostMapping
    public ResponseEntity<MetadataResponseDto> create(@RequestBody MetadataCreateDto metadadaCreateDto){
        Metadata metadata = metadataService.create(MetadataMapper.toMetadata(metadadaCreateDto));
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadadaCreateDto));
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
    @GetMapping("/usuario")
    public ResponseEntity<Metadata> getByUsuario(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(metadataService.findbyUsuario(usuario));
    }
}