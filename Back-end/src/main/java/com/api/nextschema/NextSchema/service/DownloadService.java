package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.DePara;
import com.api.nextschema.NextSchema.entity.Metadata;
import com.api.nextschema.NextSchema.enums.Validado;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.yaml.snakeyaml.DumperOptions;
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
@RequiredArgsConstructor
public class DownloadService {
    private final ColunaService colunaService;
    private final MetadataService metadataService;
    private final DeParaService deParaService;

    @Transactional(readOnly = true)
    public InputStreamResource generateYaml(Long metadataId, int estagio) {
        List<Coluna> colunas = colunaService.buscarPorMetadata(metadataId);
        Metadata metadata = metadataService.findbyId(metadataId);
        Map<String, Object> yamlData = new LinkedHashMap<>();
        Map<String, Object> metadataMap = new LinkedHashMap<>();
        metadataMap.put("nomeMetadata", metadata.getNome());
        metadataMap.put("cnpjEmpresa", metadata.getEmpresa().getCnpj());
        metadataMap.put("nomeEmpresa", metadata.getEmpresa().getNome());
        yamlData.put("metadata", metadataMap);

        List<Map<String, Object>> colunasYaml = new ArrayList<>();

        for (Coluna coluna : colunas) {
            Map<String, Object> colunaMap = new LinkedHashMap<>();
            colunaMap.put("nome", coluna.getNome());
            colunaMap.put("descricao", coluna.getDescricao());
            colunaMap.put("tipo", coluna.getTipo());
            colunaMap.put("obrigatorio", coluna.getRestricao());

            if(estagio == 2) {
                colunaMap.put("chave", coluna.getChavePrimaria());

                String status = switch (coluna.getValidado()) {
                    case VALIDADO -> "VALIDADO";
                    case INVALIDADO -> "INVALIDADO";
                    case PENDENTE -> "PENDENTE";
                };
                colunaMap.put("status", status);
            }

            if (estagio == 3) {
                List<Map<String, Object>> deParaList = new ArrayList<>();
                List<DePara> deParas = deParaService.getByColuna(coluna.getId());
                for (DePara dePara : deParas) {
                    Map<String, Object> deParaMap = new LinkedHashMap<>();
                    deParaMap.put("sinal", dePara.getSinal());
                    deParaMap.put("valorPadrao", dePara.getValorPadrao());
                    deParaMap.put("valorResultado", dePara.getValorResultado());
                    deParaList.add(deParaMap);
                }
                colunaMap.put("dePara", deParaList);
            }

            colunasYaml.add(colunaMap);
        }

        yamlData.put("colunas", colunasYaml);

        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        options.setPrettyFlow(true);

        StringWriter stringWriter = new StringWriter();
        Yaml yaml = new Yaml(options);
        yaml.dump(yamlData, stringWriter);

        byte[] yamlBytes = stringWriter.toString().getBytes();
        InputStream inputStream = new ByteArrayInputStream(yamlBytes);
        return new InputStreamResource(inputStream);
    }

    public InputStreamResource download(Long metadata, Long estagio) {
        if (estagio == 1) {
            return generateYaml(metadata,1);
        } else if (estagio == 2){
            return generateYaml(metadata,2);
        } else {
            return generateYaml(metadata,3);
        }
    }
}
