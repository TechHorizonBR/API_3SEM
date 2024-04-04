package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.web.dto.ColunaCreateDTO;
import com.api.nextschema.NextSchema.web.dto.ColunaResponseDto;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@NoArgsConstructor
public class ColunaMapper {
    public static Coluna toColuna(ColunaCreateDTO colunaCreateDTO){
        return new ModelMapper().map(colunaCreateDTO, Coluna.class);
    }
    public static Coluna toColuna(ColunaResponseDto colunaResponseDto){
        return new ModelMapper().map(colunaResponseDto, Coluna.class);
    }
}
