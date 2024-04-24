package com.api.nextschema.NextSchema.entity;

import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.web.dto.UsuarioDTO;
import jakarta.persistence.*;
import org.springframework.beans.BeanUtils;

public class UsuarioEmpresa {
    private Usuario usuario;
    private Empresa empresa;
    private String cargo; // Pode ser útil incluir informações adicionais, como cargo ou papel do usuário na empresa

    // Construtor
    public UsuarioEmpresa(Usuario usuario, Empresa empresa, String cargo) {
        this.usuario = usuario;
        this.empresa = empresa;
        this.cargo = cargo;
    }

    // Getters e Setters
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
}

