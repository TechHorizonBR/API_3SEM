package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Historico;
import com.api.nextschema.NextSchema.web.dto.HistoricoResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
public class HistoricoMapper {
    public static HistoricoResponseDto toDto(Historico historico){
        return new ModelMapper().map(historico, HistoricoResponseDto.class);
    }

    public static List<HistoricoResponseDto> toListDto(List<Historico> historicos) {
        return historicos.stream().map(historico ->
                new HistoricoResponseDto(historico.getLog(), historico.getData_hora(), historico.getUsuario().getEmail())
                ).collect(Collectors.toList());
    }
}
