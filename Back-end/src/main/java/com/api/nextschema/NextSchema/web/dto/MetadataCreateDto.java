package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Empresa;
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
    @NotBlank(message = "Nome não pode ser nulo")
    @Size(min = 6, max = 50, message = "O tamanho de nome não pode ser menor que 6 caracteres e maior que 50 caracteres.")
    private String nome;
    private Usuario usuario;
    @NotNull(message = "Empresa não pode ser nula")
    private Empresa empresa;
}
