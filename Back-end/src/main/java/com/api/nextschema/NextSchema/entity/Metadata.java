package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "metadata")
@Entity
public class Metadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome", length = 50)
    private String nome;
    @JoinColumn(name = "usuario_id", nullable = false)
    @ManyToOne
    private Usuario usuario;
    @JoinColumn(name = "empresa_id", nullable = false)
    @ManyToOne
    private Empresa empresa;
}
