package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoResponseDto {
    private String log;
    private LocalDateTime data_hora;
    private Usuario usuario;
    private Metadata metadata;
}
