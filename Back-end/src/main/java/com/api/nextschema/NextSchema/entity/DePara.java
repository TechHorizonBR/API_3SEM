package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class DePara {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Coluna coluna;
    @Column(name = "sinal", length = 20, nullable = false)
    private String sinal;
    @Column(name = "valorPadrao", length = 50, nullable = false)
    private String valorPadrao;
    @Column(name = "valorResultado", length = 50, nullable = false)
    private String valorResultado;
}
