package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.web.dto.MetadataCreateDto;
import com.api.nextschema.NextSchema.web.dto.MetadataResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@NoArgsConstructor
public class MetadataMapper {
    public static MetadataResponseDto toDto(MetadataCreateDto metadata){
        return new ModelMapper().map(metadata, MetadataResponseDto.class);
    }

    public static Metadata toMetadata (MetadataCreateDto metadataCreateDto){
        return new ModelMapper().map(metadataCreateDto, Metadata.class);
    }
}