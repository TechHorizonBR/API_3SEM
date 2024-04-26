package com.api.nextschema.NextSchema.web.dto;


import com.api.nextschema.NextSchema.enums.Validado;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ColunaUpdateValidadoDto {
    private Long id;
    private Validado validado;
}
