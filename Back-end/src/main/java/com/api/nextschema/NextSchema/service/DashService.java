package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Metadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<Double>getQuantityTypeData(List <Long> ids){
        Map<String, Integer> quantityTypedata = new HashMap<>();
        quantityTypedata.put("")
        for(Long id : ids){
            List<Metadata> metadata = metadataService.buscarPorEmpresa(id);

        }




    }

}
