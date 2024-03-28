package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Role role;
    private String email;
    private String senha;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
