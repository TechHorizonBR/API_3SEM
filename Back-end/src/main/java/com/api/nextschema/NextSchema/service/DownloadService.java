package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.Schema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
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

        Schema schema = new Schema();
        schema.setColunaList(colunaList);
        String yamlContent = colunaList.toString();


        Map<String, Object> data = new LinkedHashMap<String, Object>();

        for(Coluna coluna : colunaList){
            data.put("nome", coluna.getNome());
            data.put("descricao", coluna.getDescricao());
            data.put("tipo", coluna.getTipo());
        }
        Yaml yaml = new Yaml();
        StringWriter writer = new StringWriter();
        yaml.dump(data, writer);


        byte[] dataBytes = writer.toString().getBytes();

        // Converta o array de bytes em um InputStream
        InputStream inputStream = new ByteArrayInputStream(dataBytes);


        // Crie a resposta com o InputStreamResource
        return new InputStreamResource(inputStream);

    }
}

