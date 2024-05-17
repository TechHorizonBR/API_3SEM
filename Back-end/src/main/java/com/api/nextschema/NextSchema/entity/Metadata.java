package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Validado;
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
    @JoinColumn(name = "empresa_id", nullable = false)
    @ManyToOne
    private Empresa empresa;
    @Column(name = "validado")
    private Validado validado = Validado.PENDENTE;
}
