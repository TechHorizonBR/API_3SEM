package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.MetadataRepository;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import com.api.nextschema.NextSchema.exception.DataViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class MetadataService {
    private final MetadataRepository metadataRepository;
    private final UsuarioService usuarioService;
    public Metadata create(Metadata metadata){
        try{
            Usuario usuario = usuarioService.buscarPorId(metadata.getUsuario().getId());
            return metadataRepository.save(metadata);
        }catch (DataIntegrityViolationException ex){
            throw new DataViolationException("Todos os campos são obrigatórios.");
        }
    }
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
        metadataRepository.deleteById(id);
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
