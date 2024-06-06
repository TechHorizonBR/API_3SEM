package com.api.nextschema.NextSchema;

import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioEmpresaServiceTest {

    @Autowired
    private UsuarioEmpresaService usuarioEmpresaService;

    public void deveraCriaroUsuarioEmpresa(){
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa("002","Amanda","fatec");

        this.usuarioEmpresaService.criarRegistro(usuarioEmpresa);

    }
}
