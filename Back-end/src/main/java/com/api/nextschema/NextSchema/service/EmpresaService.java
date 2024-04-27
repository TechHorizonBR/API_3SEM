package com.api.nextschema.NextSchema.service;


import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.EmpresaRepository;
import com.api.nextschema.NextSchema.web.dto.EmpresaAtualizarDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresaService {
    private final EmpresaRepository empresaRepository;
    public Empresa criar(Empresa empresa){ return empresaRepository.save(empresa);}

    public Empresa buscarId(Long id) {return empresaRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Empresa não encontrada"));}

    public List <Empresa> buscarTodos() {return empresaRepository.findAll();}

    public Empresa buscarCNPJ(String cnpj) {return empresaRepository.findbyCNPJ(cnpj);}

    public void deleteId(Long id){ empresaRepository.deleteById(id);}


    public Empresa atualizarEmpresa(EmpresaAtualizarDto empresa) {
        Empresa empresaBuscada = buscarId(empresa.getId());
        empresaBuscada.setNome(empresa.getNome());
        return empresaRepository.save(empresaBuscada);
    }
}
