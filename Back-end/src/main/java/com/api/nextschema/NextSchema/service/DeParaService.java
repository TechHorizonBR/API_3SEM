package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.DeParaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeParaService {
    private final DeParaRepository deParaRepository;
    private final HistoricoService historicoService;

    @Transactional
    public DePara create(DePara dePara){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        historicoService.criar(new Historico(dePara.getColuna().getMetadata(), String.format("De Para da Coluna %s criada.", dePara.getColuna().getNome()),usuario));

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
        DePara dePara = getById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();
        historicoService.criar(new Historico(dePara.getColuna().getMetadata(), String.format("De Para da Coluna %s excluido.", dePara.getColuna().getNome()),usuario));
        deParaRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public List<DePara> getByColuna(Long id){
        Coluna coluna = new Coluna();
        coluna.setId(id);
        return deParaRepository.getDeParaByColuna(coluna);
    }
}
