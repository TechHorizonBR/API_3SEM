package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "colunas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Coluna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "tipo")
    private String tipo;
    @Column(name = "restricao")
    private String restricao;
    @Column(name = "descricao")
    private String descricao;

}
