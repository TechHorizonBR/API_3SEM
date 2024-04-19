package com.api.nextschema.NextSchema.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColunaUpdateChavePrimariaDTO {
    private Long id;
    private Boolean chavePrimaria;
}
