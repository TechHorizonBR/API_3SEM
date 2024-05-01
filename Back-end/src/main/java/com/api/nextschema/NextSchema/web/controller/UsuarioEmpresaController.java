package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario-empresa")
@RequiredArgsConstructor

public class UsuarioEmpresaController {

    @Autowired
    UsuarioEmpresaService usuarioEmpresaService;

    @PostMapping("/criar")
    public ResponseEntity<UsuarioEmpresa> criarRegistro(@RequestBody UsuarioEmpresa usuarioEmpresa) {
        UsuarioEmpresa novoRegistro = usuarioEmpresaService.criarRegistro(usuarioEmpresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRegistro);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRegistroPorId(@PathVariable Long id) {
        usuarioEmpresaService.deleteRegistroPorId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar-usuario-por-empresa")
    public ResponseEntity<List<UsuarioEmpresa>> buscarUsuarioPorEmpresa(@RequestParam Long usuarioId) {
        Usuario usuario = new Usuario();
        List<UsuarioEmpresa> usuarios = usuarioEmpresaService.buscarUsuarioPorEmpresa(usuario);
        return ResponseEntity.ok(usuarios);
    }

    /*@GetMapping("/buscar-empresa-por-usuario") // endereço, metodo tem que retornar a dto.
    public ResponseEntity<List<EmpresaResponseDTO>> buscarEmpresaPorUsuario(@RequestParam Long empresaId) {
        Empresa empresa = new Empresa();
        List<EmpresaResponseDTO> empresasDTO = usuarioEmpresaService.buscarEmpresaPorUsuario(empresa);
        return ResponseEntity.ok(empresasDTO);
    } // não retorna dto */

    @GetMapping("/buscar-empresa-por-usuario/{Id}") //testando
    public ResponseEntity<List<EmpresaResponseDTO>> buscarEmpresaPorUsuario(@RequestParam Long empresaId) {
        Empresa empresa = new Empresa();
        if (empresaId == null) {
            return ResponseEntity.notFound().build();}
        List<EmpresaResponseDTO> empresasDTO = empresaService.buscarEmpresaPorUsuario(empresa);
        return ResponseEntity.ok(empresasDTO);
    }
}