package com.api.nextschema.NextSchema.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmpresaCreateDTO {
    private Long id;
    private String cnpj;
    private String nome;
}
