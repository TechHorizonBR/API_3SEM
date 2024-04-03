package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.service.HistoricoService;
import com.api.nextschema.NextSchema.web.dto.HistoricoCreateDto;
import com.api.nextschema.NextSchema.web.dto.HistoricoResponseDto;
import com.api.nextschema.NextSchema.web.dto.mapper.HistoricoMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/historicos")
@RequiredArgsConstructor
public class HistoricoController {
    private final HistoricoService historicoService;

    @PostMapping
    public ResponseEntity<HistoricoResponseDto> create(@RequestBody  HistoricoCreateDto dto){
        Historico historico = historicoService.criar(HistoricoMapper.toHistorico(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(HistoricoMapper.toDto(historico));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Historico> getById(@PathVariable Long id){
        return ResponseEntity.ok().body(historicoService.buscarPorId(id));
    }
    @GetMapping
    public ResponseEntity<List<Historico>> getAll(){
        return ResponseEntity.ok(historicoService.buscarTodos());
    }
    @GetMapping("/usuario")
    public ResponseEntity<List<Historico>> getByUser(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(historicoService.buscarPorUsuario(usuario));
    }
    @GetMapping("/metadata")
    public ResponseEntity<List<Historico>> getByMetadata(@RequestBody Metadata metadata){
        return ResponseEntity.ok().body(historicoService.buscarPorMetada(metadata));
    }


}
