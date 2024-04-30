package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.web.dto.*;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
public class ColunaMapper {
    public static Coluna toColuna(ColunaCreateDto createDto) {
        return new ModelMapper().map(createDto, Coluna.class);
    }

    public static ColunaResponseDto toDto(Coluna coluna) {
        return new ModelMapper().map(coluna, ColunaResponseDto.class);
    }
    public static List<ColunaResponseDto> toListDto(List<Coluna> colunas){
        return colunas.stream().map(coluna -> toDto(coluna)).collect(Collectors.toList());

    }
    public static Coluna toColuna(ColunaUpdateDto dto){
        return new ModelMapper().map(dto, Coluna.class);
    }

    public static ColunaResponseDto toResponseDto(Coluna coluna) {
        return new ModelMapper().map(coluna, ColunaResponseDto.class);
    }

    public static ColunaUpdateValidadoDto toUpdateValidadoDto(Coluna coluna) {
        return new ModelMapper().map(coluna, ColunaUpdateValidadoDto.class);
    }
    public static Coluna toColunaBronze(ColunaUpdateDto dto){
        return new ModelMapper().map(dto, Coluna.class);
    }

}

