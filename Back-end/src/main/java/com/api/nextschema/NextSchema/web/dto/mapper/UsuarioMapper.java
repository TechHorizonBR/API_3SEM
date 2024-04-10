package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Usuario;
import com.api.nextschema.NextSchema.web.dto.*;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.util.Optional;

@NoArgsConstructor
public class UsuarioMapper {
    public static Usuario toUsuario(UsuarioCreateDTO usuarioCreateDTO){
        return new ModelMapper()
                .map(usuarioCreateDTO, Usuario.class);
    }

    public static Usuario toUsuario(UsuarioDTO usuarioDTO){
        return new ModelMapper()
                .map(usuarioDTO, Usuario.class);
    }

    public static UsuarioResponseDTO toResponseDTO (Usuario usuario){
        return new ModelMapper()
                .map(usuario, UsuarioResponseDTO.class);

    }

    public static UsuarioDTO toUsuarioDTO(Optional<Usuario> usuario){
        return new ModelMapper()
                .map(usuario, UsuarioDTO.class);

    }

    public static Usuario toUsuario (UsuarioAtualizaDadosDTO usuarioAtualizaDadosDTO){
        return new ModelMapper()
                .map(usuarioAtualizaDadosDTO, Usuario.class);
    }

    public static Usuario toUsuario (UsuarioLoginDTO usuarioLoginDTO){
        return new ModelMapper()
                .map(usuarioLoginDTO, Usuario.class);
    }
}
