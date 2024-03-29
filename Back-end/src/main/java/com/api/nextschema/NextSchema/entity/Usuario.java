package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    private String nome;
    @Column(name = "usu_role")
    private Role roleUsuario;
    @Column(name = "email", unique = true)
    private String email;
    private String senha;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
    public String toString() {
        return "Usuario{" +
                "nome='" + nome + '\'' +
                ", roleUsuario=" + roleUsuario +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", id=" + id +
                '}';
    }
}
