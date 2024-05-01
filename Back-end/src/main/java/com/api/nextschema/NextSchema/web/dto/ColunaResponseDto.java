package com.api.nextschema.NextSchema.web.dto;


import com.api.nextschema.NextSchema.enums.Validado;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ColunaResponseDto {
    private Long id;
    private String nome;
    private String tipo;
    private String descricao;
    private String restricao;
    private Boolean chavePrimaria;
    private Boolean ativo;
    private Validado validado;
}
