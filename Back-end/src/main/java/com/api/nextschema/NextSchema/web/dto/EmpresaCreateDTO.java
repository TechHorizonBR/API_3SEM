package com.api.nextschema.NextSchema.web.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmpresaCreateDTO {
    @NotBlank
    private String cnpj;
    @NotBlank
    private String nome;
}
