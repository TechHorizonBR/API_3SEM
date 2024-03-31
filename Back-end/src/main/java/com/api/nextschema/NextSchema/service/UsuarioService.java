package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


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

    public Object criarUsuario(Usuario usuario){
        var optionalUsuario = usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        if (optionalUsuario != null){
            throw new EntityNotFoundException("Usuário já cadastrado.");
        }
        return usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long idUsuario){
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        if (!usuario.isPresent()){
            throw new EntityNotFoundException("Usuário com ID " + idUsuario + " não encontrado." );
        }

        usuarioRepository.deleteById(idUsuario);
    }
    @Transactional
    public void atualizarSenha(Long id, String novaSenha){
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if(optionalUsuario.isEmpty()){
            throw new EntityNotFoundException("Usuário não existe");
        }

        usuarioRepository.atualizarSenha(id, novaSenha);
    }

    @Transactional
    public void atualizarUsuario(Usuario usuario){
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuario.getId());
        if (optionalUsuario.isEmpty()){
            throw new EntityNotFoundException("Usuário não existe");
        }
        usuarioRepository.atualizarUsuario(usuario.getId(), usuario.getEmail(), usuario.getNome(), usuario.getRoleUsuario());
    }
}
