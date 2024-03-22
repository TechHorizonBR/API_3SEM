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
    private String nome_arquivo;
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Metadata(String nome_arquivo, Integer id) {
        this.nome_arquivo = nome_arquivo;
        this.id = id;
    }
}
