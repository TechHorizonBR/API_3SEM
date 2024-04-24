package com.api.nextschema.NextSchema.repository;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioEmpresaRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByEmail(String email);

    @Modifying
    @Query("UPDATE Usuario u SET u.senha = :senha WHERE u.id = :id")
    void atualizarSenha(Long id, String senha);

    @Modifying
    @Query("UPDATE Usuario u SET u.email = :email, u.nome = :nome, u.roleUsuario = :role WHERE u.id = :id")
    void atualizarUsuario(Long id, String email, String nome, Role role);

    void deleteById(Long id);

    // Método para criar um novo usuário
    Usuario save(Usuario usuario);

    // Método para buscar todos os usuários de uma determinada empresa
    @Query("SELECT u FROM Usuario u WHERE u.empresa.nome = :nomeEmpresa")
    List<Usuario> findByEmpresa(String nomeEmpresa);

    // Método para buscar todas as empresas de um usuário específico
    @Query("SELECT u.empresa.nome FROM Usuario u WHERE u.id = :userId")
    List<String> findEmpresasByUsuarioId(Long userId);
}
