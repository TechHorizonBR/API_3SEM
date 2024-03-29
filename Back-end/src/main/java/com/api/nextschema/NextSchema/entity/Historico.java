package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "historico")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Historico {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "data_hora")
    private LocalDateTime data_hora = LocalDateTime.now();
    @Column(name = "log")
    private String log;
    @ManyToOne
    private Usuario id_usuario;
    @ManyToOne
    private Metadata id_metadata;

}
