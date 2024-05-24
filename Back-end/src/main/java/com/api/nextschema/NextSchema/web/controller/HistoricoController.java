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


    /*@GetMapping("/metadata")
    public ResponseEntity<List<Historico>> getByMetadata(@RequestBody Metadata metadata){
        return ResponseEntity.ok().body(historicoService.buscarPorMetada(metadata));
    }

     */

    @Operation(
            summary = "Buscar por metadata"
            description = "Buscar historico por metadata"
            response = {
                    @ApiREsponse(responseCode= "201", description = " encontradas"),
                            content =
    }

    )
    @getMapping("/metadata")
    public ResponseEntity<List>HistoricoResponseDto>> getByMetadata(@PathVarible Long id) {
        return ResponseEntity.ok().body(HistoricoMapper.toListDto(historicoService.buscarPorMetadata(id)));
    }


}
