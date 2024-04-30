package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioEmpresaRepository extends JpaRepository<UsuarioEmpresa, Long> {

    List<UsuarioEmpresa> findByUsuario(Usuario usuario);

    List<UsuarioEmpresa> findByEmpresa(Empresa empresa);

}
