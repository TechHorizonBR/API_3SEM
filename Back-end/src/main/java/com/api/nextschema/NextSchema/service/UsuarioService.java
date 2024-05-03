package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.DuplicateEmailException;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.exception.WrongCredentialsException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioRoleAssociationService usuarioRoleAssociationService;

    @Autowired
    EmpresaService empresaService;

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
                .orElseThrow(() -> new EntityNotFoundException("Não foi possível localizar um usuário com este e-mail"));

        return usuario;
    }

    public boolean verificarEmailExistente(String email) {
        Optional<Usuario> user = usuarioRepository.findUsuarioByEmail(email);
        return user.isPresent();
    }


    public UsuarioResponseDTO create(UsuarioCreateDTO usuarioCreateDTO) {
        if(verificarEmailExistente(usuarioCreateDTO.getEmail()))
            throw new DuplicateEmailException("Já existe usuário cadastrado com este email");

        List<Role> roleList = usuarioCreateDTO.getRoleUsuario();
        List<Long> empresaList = usuarioCreateDTO.getListEmpresa();

        Usuario novoUsuario = new Usuario();
        novoUsuario.setEmail(usuarioCreateDTO.getEmail());
        novoUsuario.setNome(usuarioCreateDTO.getNome());
        novoUsuario.setSenha(usuarioCreateDTO.getSenha());
        novoUsuario = usuarioRepository.save(novoUsuario);

        usuarioRoleAssociationService.saveAssociation(novoUsuario.getId(), roleList);
        empresaService.criarRelacao(novoUsuario, empresaList);
        UsuarioResponseDTO responseDTO = UsuarioMapper.toResponseDTO(novoUsuario);
        responseDTO.setRoleUsuario(roleList);
        return  responseDTO;
    }

    public void deletarUsuario(Long idUsuario) {
        Usuario usuario = buscarPorId(idUsuario);

        usuarioRepository.deleteById(usuario.getId());
    }

    @Transactional
    public void atualizarSenha(UsuarioAlterarSenhaDTO usuarioAlterarSenhaDTO) {
        Usuario usuario = usuarioRepository.findById(usuarioAlterarSenhaDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Não existe usuário com este id"));

        if (!usuarioAlterarSenhaDTO.getSenhaAntiga().equals(usuario.getSenha())) {
            throw new WrongCredentialsException("Senha inválida!");
        }
        if (!Objects.equals(usuarioAlterarSenhaDTO.getNovaSenha(), usuarioAlterarSenhaDTO.getNovaSenhaConfirma())) {
            throw new WrongCredentialsException("Senhas divergentes");
        }
        usuarioRepository.atualizarSenha(usuarioAlterarSenhaDTO.getId(), usuarioAlterarSenhaDTO.getNovaSenha());
    }

    @Transactional
    public UsuarioResponseDTO atualizarDados(UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO) {
        if( usuarioAtualizaDadosDTO.getNome() == null || usuarioAtualizaDadosDTO.getEmail() == null ) {
            throw new NoSuchElementException("Não é permitido campos em branco");
        }

        Usuario usuario = buscarPorId(usuarioAtualizaDadosDTO.getId());

        Usuario user = UsuarioMapper.toUsuario(usuarioAtualizaDadosDTO);
        usuarioRepository.atualizarUsuario(user.getId(), user.getNome(), user.getEmail());
        usuario = buscarPorId(usuarioAtualizaDadosDTO.getId());
        return UsuarioMapper.toResponseDTO(usuario);
    }

    public UsuarioResponseDTO login(String email, String senha) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new WrongCredentialsException("Credenciais inválidas."));


        if (!usuario.getSenha().equals(senha)) {
            throw new WrongCredentialsException("Credenciais inválidas.");
        }

        return UsuarioMapper.toResponseDTO(usuario);
    }
}
