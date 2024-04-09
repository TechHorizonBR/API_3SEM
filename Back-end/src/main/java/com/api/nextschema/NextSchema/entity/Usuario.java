package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Column(name = "usu_nome")
    private String nome;
    @Column(name = "usu_role")
    private Role roleUsuario;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "usu_senha")
    private String senha;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Usuario(UsuarioDTO usuarioNovosDados) {
        BeanUtils.copyProperties(usuarioNovosDados, this);
    }
}
