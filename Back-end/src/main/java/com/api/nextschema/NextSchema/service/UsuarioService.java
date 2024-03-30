package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Transactional(readOnly = true)
    public Usuario findById(Long id){
        try {
            return usuarioRepository.findById(id).get();
        }
        catch (Exception e){
            return null;
        }
    }
    @Transactional(readOnly = true)
    public List<UsuarioDTO> findAll()
    {
        List <Usuario> result = usuarioRepository.findAll();
        List <UsuarioDTO> dto = result.stream().map(UsuarioDTO::new).toList();
        return dto;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findUsuarioByEmail(String email){
        Usuario result = usuarioRepository.findUsuarioByEmail(email);
        return new UsuarioDTO(result);
    }

    public Usuario criarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Usuario usuario){
        usuarioRepository.deleteById(usuario.getId());
    }
}
