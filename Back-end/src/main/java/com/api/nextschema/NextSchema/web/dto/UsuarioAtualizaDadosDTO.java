package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioAtualizaDadosDTO {
    private Long id;
    private String nome;
    private Role roleUsuario;
    private String email;
}
