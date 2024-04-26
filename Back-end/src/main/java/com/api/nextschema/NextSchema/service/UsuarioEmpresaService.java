package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.*;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.HistoricoRepository;
import com.api.nextschema.NextSchema.repository.UsuarioEmpresaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

    @Service
    @RequiredArgsConstructor

    public class UsuarioEmpresaService {
        private final UsuarioEmpresaRepository usuarioEmpresaRepository;

        @Transactional(readOnly = false)
        public UsuarioEmpresa criarRegistro (UsuarioEmpresa usuarioEmpresa) {
            return usuarioEmpresaRepository.save(usuarioEmpresa);
        }
        @Transactional(readOnly = false)
        public void deleteRegistroPorId (Long id) {
             usuarioEmpresaRepository.deleteById(id);
        }

        @Transactional(readOnly = true)
        public List<UsuarioEmpresa> buscarUsuarioPorEmpresa (Usuario usuario) {
            return usuarioEmpresaRepository.findByUsuario(usuario);
        }

        @Transactional(readOnly = true)
        public List<UsuarioEmpresa> buscarEmpresaPorUsuario (Empresa empresa) {
            return usuarioEmpresaRepository.findByEmpresa(empresa);
        }
    }

