package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoCreateDto {
    private String log;
    private Usuario usuario;
    private Metadata metadata;
}
