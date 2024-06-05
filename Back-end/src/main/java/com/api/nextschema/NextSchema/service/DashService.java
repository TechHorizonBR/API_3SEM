package com.api.nextschema.NextSchema.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashService {
    private final MetadataService metadataService;
    private final ColunaService colunaService;
    private final UsuarioService usuarioService;
    private final DeParaService deParaService;
    private final HistoricoService historicoService;
    private final EmpresaService empresaService;
    private final UsuarioRoleAssociationService usuarioRoleAssociationService;
    private final UsuarioEmpresaService usuarioEmpresaService;
}
