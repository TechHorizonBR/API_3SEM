package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateDto;
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
    public List<Coluna> buscarPorMetadata(Metadata metadata){
        try {
            return colunaRepository.findColunasByMetadata(metadata);
        }
        catch (Exception ex){
            throw new EntityNotFoundException("Entidade não encontrada");
        }
    }
    @Transactional
    public Coluna atualizarColuna(ColunaUpdateDto coluna) {
        Coluna colunaEncontrada = buscarPorId(coluna.getId());

        colunaEncontrada.setDescricao(coluna.getDescricao());
        colunaEncontrada.setTipo(coluna.getTipo());
        colunaEncontrada.setNome(coluna.getNome());
        colunaEncontrada.setRestricao(coluna.getRestricao());

        return colunaRepository.save(colunaEncontrada);
    }

}
