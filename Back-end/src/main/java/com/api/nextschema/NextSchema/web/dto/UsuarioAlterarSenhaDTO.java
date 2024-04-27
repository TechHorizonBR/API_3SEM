package com.api.nextschema.NextSchema.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioAlterarSenhaDTO {

    private Long id;
    private String senhaAntiga;
    private String novaSenha;
    private String novaSenhaConfirma;
}
