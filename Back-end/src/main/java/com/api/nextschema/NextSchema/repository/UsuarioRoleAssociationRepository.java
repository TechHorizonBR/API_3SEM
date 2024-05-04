package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioRoleAssociation;
import com.api.nextschema.NextSchema.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRoleAssociationRepository  extends JpaRepository<UsuarioRoleAssociation, Long> {


    @Query("SELECT ura FROM UsuarioRoleAssociation ura WHERE ura.idUsuario = :idUsuario")
    List<UsuarioRoleAssociation> findAllByIdUsuario(Long idUsuario);

    void deleteUsuarioRoleAssociationByIdUsuario(Long idUsuario);
}
