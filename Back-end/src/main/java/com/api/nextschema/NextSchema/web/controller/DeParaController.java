package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.service.DeParaService;
import com.api.nextschema.NextSchema.web.dto.DeParaCreateDto;
import com.api.nextschema.NextSchema.web.dto.DeParaResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.DeParaMapper;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/dePara")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DeParaController {
    private final DeParaService deParaService;

    @PostMapping
    public ResponseEntity<DeParaResponseDto> create(@RequestBody DeParaCreateDto dePara){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(DeParaMapper.toDto(deParaService.create(DeParaMapper.toDePara(dePara))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeParaResponseDto> getById(@PathVariable Long id){
        return ResponseEntity.ok(DeParaMapper.toDto(deParaService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<List<DeParaResponseDto>> getAll(){
        return ResponseEntity.ok(DeParaMapper.toListDto(deParaService.getAll()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        deParaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/coluna/{id}")
    public ResponseEntity<List<DeParaResponseDto>> getByColuna(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(DeParaMapper.toListDto(deParaService.getByColuna(id)));
    }

}
