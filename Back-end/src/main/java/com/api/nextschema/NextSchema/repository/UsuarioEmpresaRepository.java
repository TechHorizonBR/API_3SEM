package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioEmpresaRepository extends JpaRepository<UsuarioEmpresa, Long> {

    List<UsuarioEmpresa> findByUsuario(Usuario usuario);

    List<UsuarioEmpresa> findByEmpresa(Empresa empresa);

}
