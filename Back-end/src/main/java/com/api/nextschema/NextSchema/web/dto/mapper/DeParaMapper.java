package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.web.dto.DeParaCreateDto;
import com.api.nextschema.NextSchema.web.dto.DeParaResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
public class DeParaMapper {
    public static DePara toDePara(DeParaCreateDto dto){
        return new ModelMapper().map(dto, DePara.class);
    }

    public static DeParaResponseDto toDto(DePara dePara){
        return new ModelMapper().map(dePara, DeParaResponseDto.class);
    }

    public static List<DeParaResponseDto> toListDto(List<DePara> deParas){
        return deParas.stream().map( dePara -> toDto(dePara)).collect(Collectors.toList());
    }
}
