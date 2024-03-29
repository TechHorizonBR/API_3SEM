package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetadataRepository extends JpaRepository<Metadata, Long> {
}
