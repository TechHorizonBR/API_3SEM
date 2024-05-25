package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.enums.Validado;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.EmpresaRepository;
import com.api.nextschema.NextSchema.repository.MetadataRepository;
import lombok.AllArgsConstructor;
import com.api.nextschema.NextSchema.exception.DataViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MetadataService {
    private final MetadataRepository metadataRepository;
    private final ColunaService colunaService;
    private final EmpresaRepository empresaRepository;
    @Transactional
    public Metadata create(Metadata metadata){
        try{
            return metadataRepository.save(metadata);
        }catch (DataIntegrityViolationException ex){
            throw new DataViolationException("Todos os campos são obrigatórios.");
        }
    }
    @Transactional(readOnly = true)
    public List<Metadata> find(){
        return metadataRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Metadata findbyId(Long id){
        return metadataRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));
    }
    @Transactional
    public void deletebyId(Long id){
        Metadata metadata = findbyId(id);
        colunaService.deleteByMetadata(metadata);
        metadataRepository.deleteById(id);

    }
    @Transactional(readOnly = true)
    public List<Metadata>buscarPorEmpresa(Long id) {
        Empresa empresa = empresaRepository.findById(id).orElseThrow( () -> new EntityNotFoundException("Entidade não encontrada"));
        return metadataRepository.findByEmpresa(empresa);
    }
    @Transactional
    public void deleteByEmpresa(Empresa empresa){
        List<Metadata> metadatas = buscarPorEmpresa(empresa.getId());
        for(Metadata metadata : metadatas){
            colunaService.deleteByMetadata(metadata);
            metadataRepository.deleteById(metadata.getId());
        }
    }
    @Transactional(readOnly = true)
    public List<Metadata> getValidatedMetadata(Long id) {
        List<Metadata> metadatas = buscarPorEmpresa(id);
        List<Metadata> metadatasValidados = new ArrayList<>();
        boolean verificador = true;
        for(Metadata metadata : metadatas){
            List<Coluna> colunas = colunaService.buscarPorMetadata(metadata.getId());

            for(Coluna coluna : colunas){
                if(coluna.getValidado() != Validado.VALIDADO){
                    verificador = false;
                }
            }
            if(verificador){
                metadatasValidados.add(metadata);
            }else{
                verificador = true;
            }
        }
        return metadatasValidados;
    }

}
