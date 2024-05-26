package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.*;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.ColunaRepository;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateAtivoDTO;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateChavePrimariaDTO;
import com.api.nextschema.NextSchema.web.dto.ColunaUpdateDto;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.ColunaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ColunaService {
    private final ColunaRepository colunaRepository;
    private final HistoricoService historicoService;
    private final DeParaService deParaService;


    @Transactional
    public Coluna criarColuna(Coluna coluna){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        historicoService.criar(new Historico(coluna.getMetadata(), String.format("Coluna %s criada.", coluna.getNome()),usuario));
        return colunaRepository.save(coluna);
    }
    @Transactional
    public List<Coluna> buscarColunas(){

        return colunaRepository.findAll();
    }
    @Transactional
    public void deleteporId(Long id){
        Coluna coluna = buscarPorId(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        historicoService.criar(new Historico(coluna.getMetadata(), String.format("Coluna %s deletada.", coluna.getNome()),usuario));
        List<DePara> deParasEncontrados = deParaService.getByColuna(coluna.getId());
        for(DePara dePara : deParasEncontrados){
            deParaService.deleteById(dePara.getId());
        }
        colunaRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public Coluna buscarPorId(Long id){
        return colunaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));
    }
    @Transactional(readOnly = true)
    public List<Coluna> buscarPorMetadata(Long id){
        try {
            Metadata metadata = new Metadata();
            metadata.setId(id);
            return colunaRepository.findColunasByMetadata(metadata);
        }
        catch (Exception ex){
            throw new EntityNotFoundException("Entidade não encontrada");
        }
    }
    @Transactional
    public Coluna atualizarColuna(ColunaUpdateDto coluna) {
        Coluna colunaEncontrada = buscarPorId(coluna.getId());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();

        if(coluna.getTipo() != colunaEncontrada.getTipo()){
            colunaEncontrada.setTipo(coluna.getTipo());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Tipo da Coluna %s editada de %s para %s.", coluna.getNome(), colunaEncontrada.getTipo(), coluna.getTipo()),usuario));
        }
        if(coluna.getNome() != colunaEncontrada.getNome()){
            colunaEncontrada.setNome(coluna.getNome());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Nome da Coluna %s editada de %s para %s.", coluna.getNome(), colunaEncontrada.getNome(), coluna.getNome()),usuario));
        }
        if(coluna.getRestricao() != colunaEncontrada.getRestricao()){
            colunaEncontrada.setRestricao(coluna.getRestricao());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Restrição da Coluna %s editada de %s para %s.", coluna.getNome(), colunaEncontrada.getRestricao(), coluna.getRestricao()),usuario));
        }
        if(coluna.getDescricao() != colunaEncontrada.getDescricao()){
            colunaEncontrada.setDescricao(coluna.getDescricao());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Descrição da Coluna %s editada de %s para %s.", coluna.getNome(), colunaEncontrada.getDescricao(), coluna.getDescricao()),usuario));
        }

        return colunaRepository.save(colunaEncontrada);
    }
    @Transactional
    public Coluna atualizarChavePrimaria(ColunaUpdateChavePrimariaDTO colunaUpdateChavePrimariaDTO){
        Coluna coluna = buscarPorId(colunaUpdateChavePrimariaDTO.getId());
        coluna.setChavePrimaria(colunaUpdateChavePrimariaDTO.getChavePrimaria());
        return colunaRepository.save(coluna);
    }
    @Transactional
    public Coluna validarColuna(ColunaUpdateBronzeDto colunaUpdateValidadoDto) {
        Coluna colunaBuscada = buscarPorId(colunaUpdateValidadoDto.getId());
        colunaBuscada.setValidado(colunaUpdateValidadoDto.getValidado());
        return colunaRepository.save(colunaBuscada);
    }
    @Transactional
    public Coluna atualizarAtivo(ColunaUpdateAtivoDTO colunaUpdateAtivoDTO){
        Coluna coluna = buscarPorId(colunaUpdateAtivoDTO.getId());
        coluna.setAtivo(colunaUpdateAtivoDTO.getAtivo());
        return colunaRepository.save(coluna);

    }
    @Transactional
    public Coluna atualizarColunaBronze(ColunaUpdateBronzeDto coluna) {

        Coluna colunaEncontrada = buscarPorId(coluna.getId());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();

        if(coluna.getChavePrimaria() != colunaEncontrada.getChavePrimaria()){
            colunaEncontrada.setChavePrimaria(coluna.getChavePrimaria());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Hash da Coluna %s editada de %s para %s.", colunaEncontrada.getNome(), colunaEncontrada.getChavePrimaria(), coluna.getChavePrimaria()),usuario));
        }

        if(coluna.getValidado() != colunaEncontrada.getValidado()){
            colunaEncontrada.setValidado(coluna.getValidado());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Validação da Coluna %s editada de %s para %s.", colunaEncontrada.getNome(), colunaEncontrada.getValidado(), coluna.getValidado()),usuario));
        }

        if(coluna.getComentario() != colunaEncontrada.getComentario()){
            colunaEncontrada.setComentario(coluna.getComentario());
            historicoService.criar(new Historico(colunaEncontrada.getMetadata(), String.format("Validação da Coluna %s editada de %s para %s.", colunaEncontrada.getNome(), colunaEncontrada.getComentario(), coluna.getComentario()),usuario));
        }
        return colunaRepository.save(colunaEncontrada);
    }
    @Transactional
    public void deleteByMetadata(Metadata metadata){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        List<Coluna> colunas = buscarPorMetadata(metadata.getId());
        for(Coluna coluna : colunas){
            List<DePara> deParasEncontrados = deParaService.getByColuna(coluna.getId());
            for(DePara dePara : deParasEncontrados){
                deParaService.deleteById(dePara.getId());
            }
            historicoService.criar(new Historico(coluna.getMetadata(), String.format("Coluna %s deletada.", coluna.getNome()),usuario));
        }
        colunaRepository.deleteByMetadata(metadata);
    }

}

