package com.api.nextschema.NextSchema.web.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ColunaValidadoDto {
    private Long id;
    private Boolean validado;
}
