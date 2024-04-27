package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;
    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long id){
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if (usuarioOptional.isEmpty()){
            throw new EntityNotFoundException("Usuáio não encontrado.");
        }
        return usuarioRepository.findById(id);

    }
    @Transactional(readOnly = true)
    public List<UsuarioDTO> findAll()
    {
        List <Usuario> result = usuarioRepository.findAll();
        return result.stream().map(UsuarioDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findUsuarioByEmail(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

        return new UsuarioDTO(usuario);
    }


    public void criarUsuario(UsuarioDTO usuarioDTO) {
        usuarioRepository.findUsuarioByEmail(usuarioDTO.getEmail())
                .ifPresent(u -> {
                    throw new EntityNotFoundException("Já existe um usuário com este email");
                });

        Usuario novoUsuario = new Usuario(usuarioDTO);
        usuarioRepository.save(novoUsuario);
    }


    public void deletarUsuario(Long idUsuario){
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

        usuarioRepository.deleteById(usuario.getId());
    }
    @Transactional
    public void atualizarSenha(Long id, String novaSenha){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este id"));

        usuarioRepository.atualizarSenha(usuario.getId(), novaSenha);
    }

    @Transactional
    public void atualizarUsuario(Usuario usuario){
        Usuario user = usuarioRepository.findById(usuario.getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        usuarioRepository.atualizarUsuario(usuario.getId(), usuario.getEmail(), usuario.getNome(), usuario.getRoleUsuario());
    }
}
