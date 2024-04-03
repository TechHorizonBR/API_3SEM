package com.api.nextschema.NextSchema.web.dto.mapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ColunaCreateDTO {
    private String nome;
    private String tipo;
    private String descricao;
    private String restricao;

}
