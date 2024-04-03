package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByEmail(String email);

    @Modifying
    @Query("UPDATE Usuario u SET u.senha = :senha where u.id = :id")
    void atualizarSenha(Long id, String senha);

    @Modifying
    @Query("UPDATE Usuario u SET u.email = :email, u.nome = :nome, u.roleUsuario = :role WHERE u.id = :id")
    void atualizarUsuario(Long id, String email, String nome, Role role);
}
