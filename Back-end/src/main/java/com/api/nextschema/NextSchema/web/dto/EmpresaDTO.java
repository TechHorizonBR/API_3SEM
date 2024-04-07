package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Empresa;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class EmpresaDTO {
    private Long id;
    private String cnpj;
    private String nome;

    public EmpresaDTO(Empresa empresa){
        BeanUtils.copyProperties(empresa, this);;
    }
}
