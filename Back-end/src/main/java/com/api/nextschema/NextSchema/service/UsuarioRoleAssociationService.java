package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioRoleAssociation;
import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.repository.UsuarioRoleAssociationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioRoleAssociationService {
    @Autowired
    private UsuarioRoleAssociationRepository usuarioRoleAssociationRepository;

    public void saveAssociation(Long idUsuario, List<Role> roleList){
        for(Role role: roleList){
            UsuarioRoleAssociation usuarioRoleAssociation = new UsuarioRoleAssociation();
            usuarioRoleAssociation.setIdUsuario(idUsuario);
            usuarioRoleAssociation.setRole(role);
            usuarioRoleAssociationRepository.save(usuarioRoleAssociation);
        }
    }

    public List<UsuarioRoleAssociation> buscarRole(Usuario usuario){
        List<UsuarioRoleAssociation> associations = usuarioRoleAssociationRepository.findAllByIdUsuario(usuario.getId());
        return associations;
    }
}
