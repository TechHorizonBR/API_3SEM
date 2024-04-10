package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColunaRepository extends JpaRepository<Coluna, Long>{
    List<Coluna> findColunasByMetadata(Metadata metadata);
}
