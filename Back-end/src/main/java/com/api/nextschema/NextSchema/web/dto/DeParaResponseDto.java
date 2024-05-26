package com.api.nextschema.NextSchema.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeParaResponseDto {
    private Long id;
    private String sinal;
    private String valorPadrao;
    private String valorResultado;
}
