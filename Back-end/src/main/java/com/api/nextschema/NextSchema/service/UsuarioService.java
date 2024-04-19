package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.DuplicateEmailException;
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
import java.util.Optional;
import java.util.zip.DataFormatException;


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
    public Usuario findByEmail(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

        return usuario;
    }

    public boolean buscarPorEmail(String email) {
        Optional<Usuario> user = usuarioRepository.findUsuarioByEmail(email);
        return user.isPresent();
    }


    public UsuarioResponseDTO create(UsuarioCreateDTO usuarioCreateDTO) {
        if(buscarPorEmail(usuarioCreateDTO.getEmail()))
            throw new DuplicateEmailException("Já existe usuário cadastrado com este email");


        Usuario novoUsuario = UsuarioMapper.toUsuario(usuarioCreateDTO);
        usuarioRepository.save(novoUsuario);

        return UsuarioMapper.toResponseDTO(
                findByEmail(usuarioCreateDTO.getEmail())
        );
    }


    public void deletarUsuario(Long idUsuario) {
        Usuario usuario = buscarPorId(idUsuario);

        usuarioRepository.deleteById(usuario.getId());
    }

    @Transactional
    public void atualizarSenha(UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO) {

        if (usuarioAlterarSenhaDTO.getNovaSenha().isEmpty() || usuarioAlterarSenhaDTO.getNovaSenhaConfirma().isEmpty() || usuarioAlterarSenhaDTO.getSenhaAntiga().isEmpty()) {
            throw new NoSuchElementException("Campos não podem estar vazios");

        }

        Usuario usuario = usuarioRepository.findById(usuarioAlterarSenhaDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este id"));

        if (!usuarioAlterarSenhaDTO.getSenhaAntiga().equals(usuario.getSenha())) {
            System.out.println(usuario.getSenha() + " " + usuarioAlterarSenhaDTO.getSenhaAntiga() );
            throw new WrongCredentialsException("Senha inválida!");
        }
        if (!Objects.equals(usuarioAlterarSenhaDTO.getNovaSenha(), usuarioAlterarSenhaDTO.getNovaSenhaConfirma())) {
            throw new WrongCredentialsException("Senhas divergentes");
        }
        usuarioRepository.atualizarSenha(usuarioAlterarSenhaDTO.getId(), usuarioAlterarSenhaDTO.getNovaSenha());
    }

    @Transactional
    public UsuarioResponseDTO atualizarDados(UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO) {
        if(usuarioAtualizaDadosDTO.getRoleUsuario() == null || usuarioAtualizaDadosDTO.getNome() == null || usuarioAtualizaDadosDTO.getEmail() == null ) {
            throw new NoSuchElementException("Não é permitido campos em branco");
        }

        Usuario usuario = buscarPorId(usuarioAtualizaDadosDTO.getId());

        Usuario user = UsuarioMapper.toUsuario(usuarioAtualizaDadosDTO);
        usuarioRepository.atualizarUsuario(user.getId(), user.getNome(), user.getEmail(), user.getRoleUsuario());
        usuario = buscarPorId(usuarioAtualizaDadosDTO.getId());
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
