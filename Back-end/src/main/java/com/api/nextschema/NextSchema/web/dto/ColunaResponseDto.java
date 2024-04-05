package com.api.nextschema.NextSchema.web.dto;


import com.api.nextschema.NextSchema.entity.Metadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ColunaResponseDto {
    private String nome;
    private String tipo;
    private String descricao;
    private String restricao;
    private Metadata metadata;

}
