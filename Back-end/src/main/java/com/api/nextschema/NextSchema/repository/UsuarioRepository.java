package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.projection.UsuarioProjection;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    List<UsuarioProjection> findUsuarioByNome(String nome);

}
