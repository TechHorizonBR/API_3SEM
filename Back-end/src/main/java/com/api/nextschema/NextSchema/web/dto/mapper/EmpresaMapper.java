package com.api.nextschema.NextSchema.web.dto.mapper;

import com.api.nextschema.NextSchema.entity.Empresa;
import com.api.nextschema.NextSchema.web.dto.EmpresaCreateDTO;
import com.api.nextschema.NextSchema.web.dto.EmpresaResponseDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import java.util.List;
import java.util.stream.Collectors;
@NoArgsConstructor
public class EmpresaMapper {

    public static Empresa toEmpresa(EmpresaCreateDTO createDTO) { return new ModelMapper().map(createDTO, Empresa.class);}

    public static EmpresaResponseDTO toDto(Empresa empresa) {
        return new ModelMapper().map(empresa, EmpresaResponseDTO.class);

    }

    public static List<EmpresaResponseDTO> toListDto(List<Empresa> empresas){
        return empresas.stream().map(empresa -> toDto(empresa)).collect(Collectors.toList());
    }
}
