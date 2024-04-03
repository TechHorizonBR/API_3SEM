package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioCreateDTO {
    private String nome;
    private Role roleUsuario;
    private String email;
    private String senha;

}
