package com.api.nextschema.NextSchema.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ColunaUpdateDto {
    private Long id;
    private String nome;
    private String tipo;
    private String descricao;
    private String restricao;
    private Boolean chavePrimaria;
}
