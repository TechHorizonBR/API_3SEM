package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.HistoricoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricoService {
    private final HistoricoRepository historicoRepository;
    @Transactional(readOnly = true)
    public Historico buscarPorId(Long id){
        return historicoRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Histórico com o id %s não encontrado.", id)));
    }
    @Transactional(readOnly = true)
    public List<Historico> buscarTodos(){
        return historicoRepository.findAll();
    }
    @Transactional
    public Historico criar(Historico historico){
        return historicoRepository.save(historico);
    }
    @Transactional(readOnly = true)
    public List<Historico> buscarPorUsuario(Usuario usuario){
        return historicoRepository.findByUser(usuario.getId());
    }
    @Transactional
    public List<Historico> buscarPorMetadata(Long id){
        return historicoRepository.findByMetadata(id);
    }
}
