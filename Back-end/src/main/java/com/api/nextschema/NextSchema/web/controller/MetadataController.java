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
@RequestMapping("/metadata")
@CrossOrigin("*")
public class MetadataController {
    private final MetadataService metadataService;

    @PostMapping
    public ResponseEntity<MetadataResponseDto> create(@RequestBody MetadataCreateDto metadadaCreateDto){
        Metadata metadata = metadataService.create(MetadataMapper.toMetadata(metadadaCreateDto));
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadata));
    }
    @GetMapping
    public ResponseEntity<List<MetadataResponseDto>> getAll(){
       List<Metadata> metadatas = metadataService.find();
        return ResponseEntity.ok().body(MetadataMapper.toListDto(metadatas));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        metadataService.deletebyId(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<MetadataResponseDto> getById(@PathVariable Long id) {
        Metadata metadata = metadataService.findbyId(id);
        return ResponseEntity.ok().body(MetadataMapper.toDto(metadata));
    }
    @PostMapping("/usuario")
    public ResponseEntity<List<MetadataResponseDto>> getByUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok().body(MetadataMapper.toListDto(metadataService.buscarPorUsuario(usuario)));
    }
}