package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Usuario {
    private String nome;
    private Role role;
    private String email;
    private String senha;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Usuario() {
    }

    public Usuario(String nome, String role, String email, String senha, Integer id) {
        this.nome = nome;
        this.role = Role.valueOf(role);
        this.email = email;
        this.senha = senha;
        this.id = id;
    }
}
