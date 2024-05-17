package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.DePara;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeParaRepository extends JpaRepository<DePara, Long> {
    List<DePara> getDeParaByColuna(Coluna coluna);
}
