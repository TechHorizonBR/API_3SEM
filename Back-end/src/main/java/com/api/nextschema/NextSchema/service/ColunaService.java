package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ColunaService {
    private final ColunaRepository colunaRepository;

    @Transactional
    public Coluna criarColuna(Coluna coluna){

        return colunaRepository.save(coluna);
    }
    @Transactional
    public List<Coluna> buscarColunas(){
        return colunaRepository.findAll();
    }
    public void deleteporId(Long id){
        colunaRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public Coluna buscarPorId(Long id){
        return colunaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));
    }
    @Transactional(readOnly = true)
    public Coluna buscarPorMetadata(Metadata metadata){
        try {
            return colunaRepository.findColunaByMetadata(metadata);
        }
        catch (Exception ex){
            throw new EntityNotFoundException("Entidade não encontrada");
        }
    }
}
