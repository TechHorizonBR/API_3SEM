package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;
import java.util.List;


@Service

public class ColunaService {
    private final ColunaRepository colunaRepository;
    public ColunaService(ColunaRepository colunaRepository) {
        this.colunaRepository = colunaRepository;
    }
    public Coluna criarColuna(Coluna coluna){
        return colunaRepository.save(coluna);
    }
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
}
