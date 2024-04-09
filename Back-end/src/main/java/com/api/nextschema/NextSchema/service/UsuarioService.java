package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Optional<UsuarioDTO> findById(Long id) {
        return Optional.ofNullable((UsuarioMapper.toUsuarioDTO(usuarioRepository.findById(id))));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> findAll() {
        List<Usuario> listUsuario = usuarioRepository.findAll();

        return listUsuario.stream()
                .map(UsuarioMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioDTO findUsuarioByEmail(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

        return new UsuarioDTO(usuario);
    }


    public UsuarioResponseDTO criarUsuario(UsuarioCreateDTO usuarioCreateDTO) {
        Usuario novoUsuario = UsuarioMapper.toUsuario(usuarioCreateDTO);
        Usuario usuario = usuarioRepository.save(novoUsuario);

        return UsuarioMapper.toResponseDTO(usuario);
    }


    public void deletarUsuario(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este email."));

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
    public UsuarioResponseDTO atualizarUsuario(UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO) {

        usuarioRepository.atualizarUsuario(usuarioAtualizaDadosDTO.getId(), usuarioAtualizaDadosDTO.getEmail(), usuarioAtualizaDadosDTO.getNome(), usuarioAtualizaDadosDTO.getRoleUsuario());
        Usuario usuario = usuarioRepository.findById(usuarioAtualizaDadosDTO.getId()).get();

        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO loginUsuario(String email, String senha) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email).get();
        if(usuario.getSenha().equals(senha)) {
            return UsuarioMapper.toResponseDTO(usuario);
        }
        return null;
    }


   /* public List<Usuario> findUsuarioByEmpresa(Long idEmpresa){
        List<Usuario> listUsers = usuarioRepository.findUsuarioByIdEmpresa(idEmpresa);

        if(listUsers.isEmpty())
            throw new EntityNotFoundException("Empresas sem usuários cadastrados");

        return listUsers;
    }*/
}
