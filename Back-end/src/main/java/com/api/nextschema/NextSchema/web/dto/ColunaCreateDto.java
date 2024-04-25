package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Metadata;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ColunaCreateDto {

    @NotBlank @Size(min = 1, max = 10)
    private String nome;
    @NotBlank @Size(min = 1, max = 30)
    private String descricao;
    @NotBlank
    private String restricao;
    @NotBlank
    private Metadata metadata;
    @NotBlank
    private Boolean chavePrimaria;

}
