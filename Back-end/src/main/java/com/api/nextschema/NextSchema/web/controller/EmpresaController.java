package com.api.nextschema.NextSchema.web.controller;


import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.service.EmpresaService;
import com.api.nextschema.NextSchema.web.dto.EmpresaCreateDTO;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import com.api.nextschema.NextSchema.web.dto.mapper.EmpresaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/empresas")
@CrossOrigin("*")

public class EmpresaController {
    private final EmpresaService empresaService;
    @PostMapping
    public ResponseEntity<EmpresaResponseDTO> create (@RequestBody EmpresaCreateDTO empresaCreateDTO){
        Empresa newEmpresa = empresaService.criar(EmpresaMapper.toEmpresa(empresaCreateDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(EmpresaMapper.toDto(newEmpresa));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getbyID(@PathVariable Long id){
        return ResponseEntity.ok().body((empresaService.buscarId(id)));
    }
    @GetMapping
    public ResponseEntity<List<EmpresaResponseDTO>> getAll(){
        List<Empresa> empresas = empresaService.buscarTodos();
       return ResponseEntity.ok(EmpresaMapper.toListDto(empresas));
        }

    @GetMapping("/{cnpj}")
    public ResponseEntity<EmpresaResponseDTO> getbyCNPJ(@PathVariable String cnpj){
        return ResponseEntity.status(HttpStatus.OK).body(EmpresaMapper.toDto(empresaService.buscarCNPJ(cnpj)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        empresaService.deleteId(id);
        return ResponseEntity.noContent().build();
    }
    //@PutMapping ResponseEntity<EmpresaResponseDTO> atulizarEmpresa(@RequestBody EmpresaAtualizarDadosDTO empresaAtualizarDadosDTO){
    //    return ResponseEntity.status(HttpStatus.OK).body(empresaService.atualizarEmpresa)
    //}

}

