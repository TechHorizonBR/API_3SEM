package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import org.hibernate.validator.constraints.Mod10Check;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioEmpresaRepository extends JpaRepository<UsuarioEmpresa, Long> {

    List<UsuarioEmpresa> findByUsuario(Usuario usuario);

    List<UsuarioEmpresa> findByEmpresa(Empresa empresa);
    @Modifying
    @Query("DELETE FROM UsuarioEmpresa u WHERE u.usuario = :usuario")
    void deleteByUsuario(@Param("usuario") Usuario usuario);

    @Modifying
    @Query("DELETE FROM UsuarioEmpresa u WHERE u.empresa = :empresa")
    void deleteByEmpresa(@Param("empresa") Empresa empresa);
}
