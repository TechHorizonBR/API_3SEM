package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.DePara;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeParaRepository extends JpaRepository<DePara, Long> {
}
