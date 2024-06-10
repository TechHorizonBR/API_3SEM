package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.*;
import com.api.nextschema.NextSchema.enums.Validado;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.api.nextschema.NextSchema.enums.Validado.*;

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
        quantityStatus.put(VALIDADO, 0);
        quantityStatus.put(Validado.INVALIDADO, 0);
        quantityStatus.put(Validado.PENDENTE, 0);

        int[] aux = {0,0,0};

        for(Long id : idEmpresas){
            List<Metadata> metadatas = metadataService.buscarPorEmpresa(id);


            for(Metadata metadata : metadatas){
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());
                int size = colunas.size();
                for(Coluna coluna : colunas){
                    if(coluna.getValidado() == VALIDADO){
                        aux[0] +=1;
                    }else if (coluna.getValidado() == Validado.INVALIDADO){
                        aux[1] +=1;
                    }else if(coluna.getValidado() == Validado.PENDENTE) {
                        aux[2] += 1;
                    }
                }

                if(aux[0] == size){
                    quantityStatus.put(VALIDADO, quantityStatus.get(VALIDADO) + 1);
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

    @Transactional(readOnly = true)  
    public Map<String, Integer> getQuantityTypeData(List <Long> ids){
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
                        case "int" :
                            quantityTypedata.put("Int", quantityTypedata.get("Int") +1);
                            break;
                        case "float" :
                            quantityTypedata.put("Float", quantityTypedata.get("Float") +1);
                            break;
                        case "boolean" :
                            quantityTypedata.put("Boolean", quantityTypedata.get("Boolean") +1);
                            break;
                        case "char" :
                            quantityTypedata.put("Char", quantityTypedata.get("Char") +1);
                            break;
                        case "date" :
                            quantityTypedata.put("Date", quantityTypedata.get("Date") +1);
                            break;
                    }
                }
            }
        }
        return quantityTypedata;

    }

    @Transactional(readOnly = true)
    public Integer getQuantityEmpresas(){
        return empresaService.buscarTodos().size();
    }

    @Transactional(readOnly = true)
    public Integer getQuantityUsersByEmpresas(List<Long> idEmpresas){
        Integer quantity = 0;
        for(Long id : idEmpresas){
            List<Long> usuarioEmpresas = usuarioEmpresaService.buscarUsuariosPorEmpresa(id);
            quantity += usuarioEmpresas.size();
        }
        return quantity;
    }

    @Transactional(readOnly = true)
    public Map<String, Integer> getQuantityByStage(List<Long> idEmpresas){
        Map<String, Integer> quantityByStage = new HashMap<>();
        quantityByStage.put("LZ", 0);
        quantityByStage.put("BRONZE", 0);
        quantityByStage.put("SILVER", 0);

        if (idEmpresas.get(0) == 0){
            List<Empresa> empresas = empresaService.buscarTodos();
            idEmpresas.clear();
            for (Empresa empresa : empresas){
                idEmpresas.add(empresa.getId());
            }

        }
        for(Long id : idEmpresas){
            List<Metadata> metadatas = metadataService.buscarPorEmpresa(id);
            for (Metadata metadata : metadatas ){
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());
                int validado = 0;
                int pendente = 0;
                for (Coluna coluna : colunas){
                    if (coluna.getValidado() == VALIDADO) {
                        validado ++;
                    }
                    else if (coluna.getValidado() == PENDENTE){
                        pendente ++;
                    }
                };
                if (pendente == colunas.size()){
                    quantityByStage.put("LZ", quantityByStage.get("LZ") +1);


                } else if (validado == colunas.size()){
                    quantityByStage.put("SILVER", quantityByStage.get("SILVER") +1);
                } else {
                    quantityByStage.put("BRONZE", quantityByStage.get("BRONZE") +1);
                }
            }

        };


        return quantityByStage;
    }

}
