package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.web.dto.UsuarioCreateDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioResponseDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

@NoArgsConstructor
public class UsuarioMapper {
    public static Usuario toUsuario(UsuarioCreateDTO usuarioCreateDTO){
        return new ModelMapper()
                .map(usuarioCreateDTO, Usuario.class);
    }


    public static UsuarioResponseDTO toResponseDTO (Usuario usuario){
        return new ModelMapper()
                .map(usuario, UsuarioResponseDTO.class);

    }
}
