package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.enums.Validado;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public Map<Validado, Integer> getQuantityStatus(List<Long> idEmpresas){
        Map<Validado, Integer> quantityStatus = new HashMap<>();
        quantityStatus.put(Validado.VALIDADO, 0);
        quantityStatus.put(Validado.INVALIDADO, 0);
        quantityStatus.put(Validado.PENDENTE, 0);

        int[] aux = {0,0,0};

        for(Long id : idEmpresas){
            List<Metadata> metadatas = metadataService.buscarPorEmpresa(id);


            for(Metadata metadata : metadatas){
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());
                int size = colunas.size();
                for(Coluna coluna : colunas){
                    if(coluna.getValidado() == Validado.VALIDADO){
                        aux[0] +=1;
                    }else if (coluna.getValidado() == Validado.INVALIDADO){
                        aux[1] +=1;
                    }else if(coluna.getValidado() == Validado.PENDENTE) {
                        aux[2] += 1;
                    }
                }

                if(aux[0] == size){
                    quantityStatus.put(Validado.VALIDADO, quantityStatus.get(Validado.VALIDADO) + 1);
                }else if(aux[1] > 0){
                    quantityStatus.put(Validado.INVALIDADO, quantityStatus.get(Validado.INVALIDADO) + 1);
                }else{
                    quantityStatus.put(Validado.PENDENTE, quantityStatus.get(Validado.PENDENTE) + 1);
                }

                aux[0] = 0;
                aux[1] = 0;
                aux[2] = 0;

            }
        }
        return quantityStatus;

    }
}
