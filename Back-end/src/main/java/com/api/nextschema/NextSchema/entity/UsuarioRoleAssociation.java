package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioRoleAssociation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "usuario_id")
    private Long idUsuario;

    @JoinColumn(name = "role_id")
    private Role role;
}
