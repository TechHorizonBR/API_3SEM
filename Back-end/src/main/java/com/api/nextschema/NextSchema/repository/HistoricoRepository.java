package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    List<Historico> findByUser(Usuario usuario);

    List<Historico> findByMetada(Metadata metadata);
}
