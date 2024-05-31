package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class DownloadService {
    @Autowired
    private ColunaService colunaService;

    public InputStreamResource downloadYamlLZ(Long metadataId){
        List<Coluna> colunaList = colunaService.buscarPorMetadata(metadataId);

        List<Map<String, Object>> colunasMapList = new ArrayList<>();

        for (Coluna coluna : colunaList) {
            Map<String, Object> colunaMap = new LinkedHashMap<>();
            colunaMap.put("nome", coluna.getNome());
            colunaMap.put("descricao", coluna.getDescricao());
            colunaMap.put("tipo", coluna.getTipo());
            colunasMapList.add(colunaMap);
        }

        StringWriter stringWriter = new StringWriter();
        Yaml yaml = new Yaml();
        yaml.dump(colunasMapList, stringWriter);

        byte[] yamlBytes = stringWriter.toString().getBytes();

        InputStream inputStream = new ByteArrayInputStream(yamlBytes);

        // Converta o array de bytes em um InputStream
        return new InputStreamResource(inputStream);
    }
}
