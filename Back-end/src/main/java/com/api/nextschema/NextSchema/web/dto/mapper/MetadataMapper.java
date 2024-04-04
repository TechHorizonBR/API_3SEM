package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.web.dto.MetadataResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.Meta;

@NoArgsConstructor
public class MetadataMapper {
    public static Metadata toMetadata(MetadataResponseDto metadataResponseDto){
        return new ModelMapper().map(metadataResponseDto, Metadata.class);
    }
}
