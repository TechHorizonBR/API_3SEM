package com.api.nextschema.NextSchema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Objects;

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
    @Column(name = "data_hora")
    private LocalDateTime data_hora = LocalDateTime.now();
    @Column(name = "log")
    private String log;
    @CreatedBy
    @ManyToOne
    private Usuario usuario;
    @ManyToOne
    private Metadata metadata;

    public Historico(Metadata metadata, String log, Usuario usuario){
        this.metadata = metadata;
        this.log = log;
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Historico historico = (Historico) o;
        return Objects.equals(id, historico.id) && Objects.equals(data_hora, historico.data_hora) && Objects.equals(log, historico.log) && Objects.equals(usuario, historico.usuario) && Objects.equals(metadata, historico.metadata);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
