package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.service.DeParaService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<DePara> create(@RequestBody DePara dePara){
        return ResponseEntity.status(HttpStatus.CREATED).body(deParaService.create(dePara));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DePara> getById(@PathVariable Long id){
        return ResponseEntity.ok(deParaService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<DePara>> getAll(){
        return ResponseEntity.ok(deParaService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        deParaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
