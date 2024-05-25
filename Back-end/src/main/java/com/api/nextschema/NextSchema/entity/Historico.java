package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "historico")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Historico {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreatedDate
    @Column(name = "data_hora")
    private LocalDateTime data_hora;
    @Column(name = "log")
    private String log;
    @CreatedBy
    @ManyToOne
    private Usuario usuario;
    @ManyToOne
    private Metadata metadata;

    public Historico(Metadata metadata, String log){
        this.metadata = metadata;
        this.log = log;
    }

}
