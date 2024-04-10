package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import com.api.nextschema.NextSchema.web.dto.MetadataCreateDto;
import com.api.nextschema.NextSchema.web.dto.MetadataResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
public class MetadataMapper {

    public static MetadataResponseDto toDto (Metadata metadata){
        return new ModelMapper().map(metadata, MetadataResponseDto.class );
    }
    public static Metadata toMetadata (MetadataCreateDto metadataCreateDto){
        return new ModelMapper().map(metadataCreateDto, Metadata.class);
    }

    public static List<MetadataResponseDto> toListDto(List<Metadata> metadatas){
        return metadatas.stream().map(metadata -> toDto(metadata)).collect(Collectors.toList());

    }
}