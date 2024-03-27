package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class ColunaService {
    private final ColunaRepository colunaRepository;
    public ColunaService(ColunaRepository colunaRepository) {this.colunaRepository = colunaRepository;}
    public Coluna criarColuna(Coluna coluna){return colunaRepository.save(coluna);}
    public List<Coluna> buscarColunas(){return colunaRepository.findAll();}
    public void deleteporId(Long id){colunaRepository.deleteById(id);}
}
