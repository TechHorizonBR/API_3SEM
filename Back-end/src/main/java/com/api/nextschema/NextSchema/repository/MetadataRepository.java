package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.enums.Validado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MetadataRepository extends JpaRepository<Metadata, Long> {
    List<Metadata> findByEmpresa(Empresa empresa);
    @Query("select m from Metadata m where m.validado = :validado")
    List<Metadata> findByStatusIgnoreCase(@Param("validado") Validado validado);
}
