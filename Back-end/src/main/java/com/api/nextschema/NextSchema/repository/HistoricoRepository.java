package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoRepository extends JpaRepository<Historico, Long> {
    @Query("SELECT h FROM Historico h WHERE h.usuario.id = :userid")
    List<Historico> findByUser(@Param("userid") Long userid);
    @Query("SELECT h FROM Historico h WHERE h.metadata.id = :metadata_id")
    List<Historico> findByMetadata(@Param("metadata_id") Long metadataid);

    @Modifying
    @Query("DELETE FROM Historico h WHERE h.metadata.id = :id")
    void deleteByMetadata(@Param("id") Long id);

    @Modifying
    @Query("DELETE FROM Historico h WHERE h.usuario = :usuario")
    void deleteByUsuario(@Param("usuario") Usuario usuario);
}
