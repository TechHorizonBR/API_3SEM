package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.DeParaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeParaService {
    private final DeParaRepository deParaRepository;

    @Transactional
    public DePara create(DePara dePara){
        return deParaRepository.save(dePara);
    }

    @Transactional(readOnly = true)
    public DePara getById(Long id){
        return deParaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Entidade De Para com id: %s invalido.", id)));
    }

    @Transactional(readOnly = true)
    public List<DePara> getAll(){
        return deParaRepository.findAll();
    }

    @Transactional
    public void deleteById(Long id){
        getById(id);
        deParaRepository.deleteById(id);
    }
}
