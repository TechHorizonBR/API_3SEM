package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.*;
import com.api.nextschema.NextSchema.enums.Validado;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    public Map<Validado, Integer> getQuantityStatus(List<Long> idEmpresas, Long idMetadata){
        Map<Validado, Integer> quantityStatus = new HashMap<>();
        quantityStatus.put(VALIDADO, 0);
        quantityStatus.put(Validado.INVALIDADO, 0);
        quantityStatus.put(Validado.PENDENTE, 0);

        if(idEmpresas.get(0) == 0){
            List<Empresa> empresas = empresaService.buscarTodos();
            idEmpresas.clear();
            for(Empresa empresa : empresas){
                idEmpresas.add(empresa.getId());
            }
        }

        for(Long id : idEmpresas){
            List<Metadata> metadatas = new ArrayList<>();

            if(idMetadata == 0){
                metadatas.addAll(metadataService.buscarPorEmpresa(id));

            }else{
                metadatas.add(metadataService.findbyId(idMetadata));
            }


            for(Metadata metadata : metadatas){
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());

                for(Coluna coluna : colunas) {
                    if (coluna.getValidado() == VALIDADO) {
                        quantityStatus.put(VALIDADO, quantityStatus.get(VALIDADO) + 1);
                    } else if (coluna.getValidado() == Validado.INVALIDADO) {
                        quantityStatus.put(Validado.INVALIDADO, quantityStatus.get(Validado.INVALIDADO) + 1);
                    } else if (coluna.getValidado() == Validado.PENDENTE) {
                        quantityStatus.put(Validado.PENDENTE, quantityStatus.get(Validado.PENDENTE) + 1);
                    }
                }
            }
            if (idMetadata == 0) break;
        }
        return quantityStatus;
    }

    @Transactional(readOnly = true)
    public Map<String, Integer> getQuantityTypeData(List<Long> ids, Long idMetadata) {
        if (ids.get(0) == 0 && idMetadata == 0) {
            List<Empresa> empresas = empresaService.buscarTodos();
            ids.clear();
            for (Empresa empresa : empresas) {
                ids.add(empresa.getId());
            }
        }

        Map<String, Integer> quantityTypedata = new HashMap<>();
        quantityTypedata.put("String", 0);
        quantityTypedata.put("Int", 0);
        quantityTypedata.put("Float", 0);
        quantityTypedata.put("Boolean", 0);
        quantityTypedata.put("Char", 0);
        quantityTypedata.put("Date", 0);

        for (Long id : ids) {
            List<Metadata> metadatas;

            if (idMetadata == 0) {
                metadatas = metadataService.buscarPorEmpresa(id);
            } else {
                metadatas = Collections.singletonList(metadataService.findbyId(idMetadata));
            }

            for (Metadata metadata : metadatas) {
                List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());
                for (Coluna coluna : colunas) {
                    String tipo = coluna.getTipo().toLowerCase();
                    switch (tipo) {
                        case "string":
                            quantityTypedata.put("String", quantityTypedata.get("String") + 1);
                            break;
                        case "int":
                            quantityTypedata.put("Int", quantityTypedata.get("Int") + 1);
                            break;
                        case "float":
                            quantityTypedata.put("Float", quantityTypedata.get("Float") + 1);
                            break;
                        case "boolean":
                            quantityTypedata.put("Boolean", quantityTypedata.get("Boolean") + 1);
                            break;
                        case "char":
                            quantityTypedata.put("Char", quantityTypedata.get("Char") + 1);
                            break;
                        case "date":
                            quantityTypedata.put("Date", quantityTypedata.get("Date") + 1);
                            break;
                    }
                }
            }

            if (idMetadata != 0) break;
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
        if (idEmpresas.get(0) == 0) {
            idEmpresas.clear();
            idEmpresas.addAll(empresaService.buscarTodosId());
        }
        for(Long id : idEmpresas){
            List<Long> usuarioEmpresas = usuarioEmpresaService.buscarUsuariosPorEmpresa(id);
            quantity += usuarioEmpresas.size();
        }
        return quantity;
    }

    @Transactional(readOnly = true)
    public Map<String, Integer> getQuantityColunasByEmpresa(List<Long> idEmpresas) {
        Map<String, Integer> quantityColunas = new HashMap<>();

        if (idEmpresas.get(0) == 0) {
            idEmpresas.clear();
            idEmpresas.addAll(empresaService.buscarTodosId());
        }
        for (Long id : idEmpresas) {
            List<Metadata> metadataList = metadataService.buscarPorEmpresa(id);
            for (Metadata metadata : metadataList) {
                quantityColunas.put(metadata.getNome(), colunaService.buscarPorMetadata(metadata.getId()).size());
            }
        }
        return quantityColunas;
    }
  
    @Transactional(readOnly = true)
    public Map<String, Integer> getQuantityByStage(List<Long> idEmpresas){
        Map<String, Integer> quantityByStage = new HashMap<>();
        quantityByStage.put("LZ", 0);
        quantityByStage.put("BRONZE", 0);
        quantityByStage.put("SILVER", 0);
        quantityByStage.put("FINALIZADO", 0);

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
                    int check = 0;
                    for(Coluna coluna : colunas){
                        List<DePara> deParas = deParaService.getByColuna(coluna.getId());
                        if(deParas.isEmpty()){
                            check = 1;
                        }
                    }
                    if (check == 1){
                        quantityByStage.put("SILVER", quantityByStage.get("SILVER") +1);

                    }else{
                        quantityByStage.put("FINALIZADO", quantityByStage.get("FINALIZADO") +1);
                    }

                } else {
                    quantityByStage.put("BRONZE", quantityByStage.get("BRONZE") +1);
                }
            }

        };


        return quantityByStage;
    }

    public Integer getQuantityMetadata(List<Long> idEmpresas){
        Integer quantity = 0;

        if (idEmpresas.get(0) == 0){
            List<Empresa> empresas = empresaService.buscarTodos();
            idEmpresas.clear();
            for (Empresa empresa : empresas){
                idEmpresas.add(empresa.getId());
            }
        }

        for(Long id : idEmpresas){
            quantity+= metadataService.buscarPorEmpresa(id).size();
        }

        return quantity;
    }

}
