package com.api.nextschema.NextSchema.web.dto;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.web.dto.mapper.UsuarioMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;

}
