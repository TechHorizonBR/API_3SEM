package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.*;
import com.api.nextschema.NextSchema.repository.EmpresaRepository;
import com.api.nextschema.NextSchema.repository.UsuarioEmpresaRepository;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor

public class UsuarioEmpresaService {
    private final UsuarioEmpresaRepository usuarioEmpresaRepository;
    private final EmpresaService empresaService;
    private final UsuarioService usuarioService;

    @Transactional(readOnly = false)
    public UsuarioEmpresa criarRegistro (UsuarioEmpresa usuarioEmpresa) {
        return usuarioEmpresaRepository.save(usuarioEmpresa);
    }


    @Transactional(readOnly = false)
    public void deleteRegistroPorId (Long id) {
        usuarioEmpresaRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Long> buscarUsuariosPorEmpresa (Long idEmpresa) {
        List<UsuarioEmpresa> buscados =  usuarioEmpresaRepository.findByEmpresa(empresaService.buscarId(idEmpresa));
        List<Long> usuariosIds = new LinkedList<>();

        for(UsuarioEmpresa ue : buscados){
            usuariosIds.add(ue.getUsuario().getId());
        }
        return usuariosIds;
    }

    @Transactional(readOnly = true)
    public List<EmpresaResponseDTO> buscarEmpresasPorUsuario (Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        List<UsuarioEmpresa> usuarioEmpresas = usuarioEmpresaRepository.findByUsuario(usuario);
        List<EmpresaResponseDTO> empresasDTO = new ArrayList<>();

        for (UsuarioEmpresa usuarioEmpresa : usuarioEmpresas) {
            EmpresaResponseDTO empresaDTO = new EmpresaResponseDTO();
            empresaDTO.setNome(usuarioEmpresa.getEmpresa().getNome());
            empresaDTO.setCnpj(usuarioEmpresa.getEmpresa().getCnpj());
            empresaDTO.setId(usuarioEmpresa.getEmpresa().getId());
            empresasDTO.add(empresaDTO);
        }

        return empresasDTO;
    }

}
