package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioDTO {
    private  Long id;
    private String nome;
    private Role role;
    private String email;
    private String senha;

    public UsuarioDTO(Usuario usuario) {
        //   BeanUtils.copyProperties(usuario, this);
    }
}
