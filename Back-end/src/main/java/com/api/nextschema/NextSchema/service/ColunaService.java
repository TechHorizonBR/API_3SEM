package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import com.api.nextschema.NextSchema.web.dto.ColunaCreateDto;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateChavePrimariaDTO;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateDto;
import com.api.nextschema.NextSchema.web.dto.mapper.ColunaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;


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
    @Transactional
    public Coluna atualizarChavePrimaria(ColunaUpdateChavePrimariaDTO colunaUpdateChavePrimariaDTO){
        Coluna coluna = buscarPorId(colunaUpdateChavePrimariaDTO.getId());
        coluna.setChavePrimaria(colunaUpdateChavePrimariaDTO.getChavePrimaria());
        return colunaRepository.save(coluna);

    }
    @Transactional
    public Coluna validarColuna(Coluna coluna) {
        Coluna colunaBuscada = buscarPorId(coluna.getId());
        colunaBuscada.setValidado(coluna.getValidado());
        return colunaRepository.save(colunaBuscada);

    }
}

