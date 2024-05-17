package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Coluna;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeParaCreateDto {
    private Coluna coluna;
    private String sinal;
    private String valorPadrao;
    private String valorResultado;
}
