package com.api.nextschema.NextSchema.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioLoginDTO {
    @NotBlank(message = "Email não pode estar vazio.")
    @Email(message = "Formato de email inválido.")
    private String email;
    private String senha;
}
