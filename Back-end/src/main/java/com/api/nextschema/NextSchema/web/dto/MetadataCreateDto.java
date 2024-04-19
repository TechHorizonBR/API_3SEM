package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class MetadataCreateDto {
    @NotBlank
    @Size(min = 6, max = 50)
    private String nome;
    @NotBlank
    private Usuario usuario;
}
