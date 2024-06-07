package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
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
        quantityTypedata.put("String", 0);
        quantityTypedata.put("Int", 0);
        quantityTypedata.put("Float", 0);
        quantityTypedata.put("Boolean", 0);
        quantityTypedata.put("Char", 0);
        quantityTypedata.put("Date", 0);
        for(Long id : ids){
            List<Metadata> metadatas = metadataService.buscarPorEmpresa(id);
            for(Metadata metadata : metadatas){
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());
                for (Coluna coluna : colunas){
                    switch (coluna.getTipo()){
                        case "string" :
                            quantityTypedata.put("String", quantityTypedata.get("String") +1);
                            break;

                    }
                }
            }
        }




    }

}
