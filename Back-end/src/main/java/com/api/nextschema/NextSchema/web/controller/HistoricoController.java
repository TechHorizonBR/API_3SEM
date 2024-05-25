package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.HistoricoService;
import com.api.nextschema.NextSchema.web.dto.HistoricoResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.HistoricoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/historicos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class HistoricoController {
    private final HistoricoService historicoService;

    @GetMapping("/metadata/{id}")
    public ResponseEntity<List<HistoricoResponseDto>> getByMetadata(@PathVariable Long id) {
        return ResponseEntity.ok().body(HistoricoMapper.toListDto(historicoService.buscarPorMetadata(id)));
    }


}
