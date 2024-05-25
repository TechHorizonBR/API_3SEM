package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.UsuarioRoleAssociation;
import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.exception.DuplicateEmailException;
import com.api.nextschema.NextSchema.exception.EntityNotFoundException;
import com.api.nextschema.NextSchema.exception.WrongCredentialsException;
import com.api.nextschema.NextSchema.repository.UsuarioRepository;
import com.api.nextschema.NextSchema.web.dto.*;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioRoleAssociationService usuarioRoleAssociationService;

    @Autowired
    EmpresaService empresaService;
    @Autowired
    UsuarioEmpresaService usuarioEmpresaService;

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada"));

        return vincularRole(usuario);
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> findAll() {
        List<Usuario> listUsuario = usuarioRepository.findAll();
        List<UsuarioResponseDTO> usuariosResponse = new LinkedList<>();

        for (Usuario usuario : listUsuario){
            List<UsuarioRoleAssociation> roles = usuarioRoleAssociationService.buscarRole(usuario.getId());
            List<Role> rolesUsuarios = new ArrayList<>();
            for(UsuarioRoleAssociation roleUsuario : roles){
                rolesUsuarios.add(roleUsuario.getRole());
            }
            List<EmpresaResponseDTO> empresasUsuarios = usuarioEmpresaService.buscarEmpresasPorUsuario(usuario.getId());
            List<Long> idsEmpresas = new ArrayList<>();
            for(EmpresaResponseDTO empresa : empresasUsuarios){
                idsEmpresas.add(empresa.getId());
            }
            UsuarioResponseDTO usuarioResponseDTO = new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), rolesUsuarios, idsEmpresas);
            usuariosResponse.add(usuarioResponseDTO);
        }
        return usuariosResponse;
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO findByEmail(String email) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Não foi possível localizar um usuário com este e-mail"));

        return vincularRole(usuario);
    }

    public boolean verificarEmailExistente(String email) {
        Optional<Usuario> user = usuarioRepository.findUsuarioByEmail(email);
        return user.isPresent();
    }


    public UsuarioResponseDTO create(Usuario novoUsuario, List<Role> roleList, List<Long> empresaList) {
        if(verificarEmailExistente(novoUsuario.getEmail()))
            throw new DuplicateEmailException("Já existe usuário cadastrado com este email");

        novoUsuario = usuarioRepository.save(novoUsuario);

        usuarioRoleAssociationService.saveAssociation(novoUsuario.getId(), roleList);
        empresaService.criarRelacao(novoUsuario, empresaList);
        UsuarioResponseDTO responseDTO = UsuarioMapper.toResponseDTO(novoUsuario);
        responseDTO.setRoleUsuario(roleList);
        return  responseDTO;
    }

    @Transactional
    public void deletarUsuario(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(() -> new EntityNotFoundException("Usuário não cadastrado"));

        usuarioRoleAssociationService.deleteAssociation(idUsuario);
        usuarioEmpresaService.deleteByUsuario(usuario);
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
        Usuario user = usuarioRepository.findById(usuarioAtualizaDadosDTO.getId()).orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado!"));

        user.setNome(usuarioAtualizaDadosDTO.getNome());
        user.setEmail(usuarioAtualizaDadosDTO.getEmail());
        usuarioRepository.save(user);

        List<Role> roleList = usuarioAtualizaDadosDTO.getRoleUsuario();

        usuarioRoleAssociationService.atualizarRole(usuarioAtualizaDadosDTO.getId(), roleList);
        Usuario usuario = new Usuario();
        usuario.setId(usuarioAtualizaDadosDTO.getId());
        usuarioEmpresaService.atualizarEmpresasUsuarios(usuario, usuarioAtualizaDadosDTO.getListEmpresa());

        return vincularRole(user);
    }
    public UsuarioResponseDTO vincularRole(Usuario usuario){
        UsuarioResponseDTO responseDTO = UsuarioMapper.toResponseDTO(usuario);

        List<UsuarioRoleAssociation> association = usuarioRoleAssociationService.buscarRole(usuario.getId());
        List<Role> roleListservice = new LinkedList<>();

        for(UsuarioRoleAssociation usuarioRoleAssociation : association) {
            roleListservice.add(usuarioRoleAssociation.getRole());
        }

        responseDTO.setRoleUsuario(roleListservice);
        List<Long> idsEmpresas = new ArrayList<>();

        List<EmpresaResponseDTO> empresasEncontras = usuarioEmpresaService.buscarEmpresasPorUsuario(usuario.getId());
        System.out.println("size: " + empresasEncontras.size());
        for(EmpresaResponseDTO empresaResponseDTO : empresasEncontras){
            System.out.println("Encontrei a empresa: " + empresaResponseDTO.getNome());
            idsEmpresas.add(empresaResponseDTO.getId());
        }
        responseDTO.setListEmpresa(idsEmpresas);
        return responseDTO;
    }

    public UsuarioResponseDTO login(String email, String senha) {
        Usuario usuario = usuarioRepository.findUsuarioByEmail(email)
                .orElseThrow(() -> new WrongCredentialsException("Credenciais inválidas."));

        if (!usuario.getSenha().equals(senha)) {
            throw new WrongCredentialsException("Credenciais inválidas.");
        }

        return vincularRole(usuario);
    }

}
