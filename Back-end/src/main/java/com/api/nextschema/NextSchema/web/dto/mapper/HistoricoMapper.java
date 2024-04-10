package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.web.dto.HistoricoCreateDto;
import com.api.nextschema.NextSchema.web.dto.HistoricoResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@NoArgsConstructor
public class HistoricoMapper {
    public static Historico toHistorico(HistoricoCreateDto dto) {
        return new ModelMapper()
                .map(dto, Historico.class);
    }
    public static HistoricoResponseDto toDto(Historico historico){
        return new ModelMapper().map(historico, HistoricoResponseDto.class);
    }
}
