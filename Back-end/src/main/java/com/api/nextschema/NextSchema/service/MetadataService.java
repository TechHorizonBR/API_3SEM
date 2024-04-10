package com.api.nextschema.NextSchema.service;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.MetadataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class MetadataService {
    private final MetadataRepository metadataRepository;
    public Metadata create(Metadata metadata){
        return metadataRepository.save(metadata);
    }
    public List<Metadata> find(){
        return metadataRepository.findAll();
    }
    public void deletebyId(Long id){ metadataRepository.deleteById(id);}
    @Transactional(readOnly = true)
    public Metadata findbyId(Long id){
        return metadataRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));
    }
    @Transactional(readOnly = true)
    public List<Metadata> buscarPorUsuario(Usuario usuario){
        try {
            return metadataRepository.findMetadataByUsuario(usuario);
        }
        catch (Exception ex){
            throw new EntityNotFoundException("Entidade não encontrada");
        }
    }



}
