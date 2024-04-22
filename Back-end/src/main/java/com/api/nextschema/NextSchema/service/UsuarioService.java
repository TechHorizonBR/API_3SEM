package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.exception.WrongCredentialsException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.List;


@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> findAll() {
        List<Usuario> listUsuario = usuarioRepository.findAll();

        return listUsuario.stream()
                .map(UsuarioMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findByEmail(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

        return new UsuarioDTO(usuario);
    }


    public UsuarioResponseDTO create(UsuarioCreateDTO usuarioCreateDTO) {
        Usuario novoUsuario = UsuarioMapper.toUsuario(usuarioCreateDTO);
        Usuario usuario = usuarioRepository.save(novoUsuario);

        return UsuarioMapper.toResponseDTO(usuario);
    }


    public void deletarUsuario(Long idUsuario) {
        Usuario usuario = buscarPorId(idUsuario);

        usuarioRepository.deleteById(usuario.getId());
    }

    @Transactional
    public void atualizarSenha(UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO) {
        Usuario usuario = usuarioRepository.findById(usuarioAlterarSenhaDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este id"));

        if (!Objects.equals(usuarioAlterarSenhaDTO.getSenhaAntiga(), usuario.getSenha())) {
            throw new EntityNotFoundException("Senha inválida!");
        }
        if (!Objects.equals(usuarioAlterarSenhaDTO.getNovaSenha(), usuarioAlterarSenhaDTO.getNovaSenhaConfirma())) {
            throw new EntityNotFoundException("Senhas divergentes");
        }
        usuarioRepository.atualizarSenha(usuarioAlterarSenhaDTO.getId(), usuarioAlterarSenhaDTO.getNovaSenha());
    }

    @Transactional
    public UsuarioResponseDTO atualizarDados(UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO) {

        usuarioRepository.atualizarUsuario(usuarioAtualizaDadosDTO.getId(), usuarioAtualizaDadosDTO.getEmail(), usuarioAtualizaDadosDTO.getNome(), usuarioAtualizaDadosDTO.getRoleUsuario());
        Usuario usuario = usuarioRepository.findById(usuarioAtualizaDadosDTO.getId()).get();

        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO login(String email, String senha) {
        if(email.isBlank()) throw new NoSuchElementException("Email não pode estar em branco");
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new WrongCredentialsException("Email ou senha inválida."));

        if (usuario.getSenha().equals(senha)) {
            throw new WrongCredentialsException("Email ou senha inválida.");
        }
        return UsuarioMapper.toResponseDTO(usuario);
    }
}
