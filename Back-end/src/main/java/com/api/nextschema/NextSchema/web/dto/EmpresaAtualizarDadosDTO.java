package com.api.nextschema.NextSchema.web.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaAtualizarDadosDTO {
    private Long id;
    private String nome;
    private String cnpj;
}
