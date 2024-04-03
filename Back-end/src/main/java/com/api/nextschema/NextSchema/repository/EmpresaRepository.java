package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    @Query("select e from Empresa e where e.cnpj = :cnpj")
    Empresa findbyCNPJ(@Param("cnpj") String cnpj);
}
