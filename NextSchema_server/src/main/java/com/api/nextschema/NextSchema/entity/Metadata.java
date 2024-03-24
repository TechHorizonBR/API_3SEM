package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Metadata {
    private String nomeArquivo;
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Metadata(String nomeArquivo, Integer id) {
        this.nomeArquivo = nomeArquivo;
        this.id = id;
    }

    public Metadata(String nomeArquivo, String email, Integer id) {
        this.nomeArquivo = nomeArquivo;
        this.email = email;
        this.id = id;
    }

    public Metadata() {

    }
}
