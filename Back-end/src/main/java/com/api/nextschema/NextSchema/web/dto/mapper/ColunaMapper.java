package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.web.dto.ColunaCreateDto;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
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

}

