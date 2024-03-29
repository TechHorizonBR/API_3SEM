package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColunaRepository extends JpaRepository<Coluna, Long>{
    Coluna findColunaByMetadata(Metadata metadata);
}
