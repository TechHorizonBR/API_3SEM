package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioCreateDTO {
    @NotBlank(message = "Nome não está vazio.")
    private String nome;
    private List<Role> roleUsuario;
    @NotBlank(message = "Email não pode estar vazio.")
    @Email(message = "Formato de email inválido")
    private String email;
    @Size(min = 6, max = 20)
    private String senha;
    private List<Long> listEmpresa;

}
