package com.api.nextschema.NextSchema.service;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.entity.DePara;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UploadService {
    private static final long MAX_FILE_SIZE_BYTES = 1024L * 1024L * 1024L;
    private final DeParaService deParaService;
    private final ColunaService colunaService;
    public Object uploadFile(MultipartFile file, Boolean hasHeader){
        upload(file);

        try{
            BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));

            List<String> data = new ArrayList<>();
            String line = br.readLine();
            if(hasHeader && line != null){
                data.add(line);
                line = br.readLine();
                if(line != null){
                    data.add(line);
                }
            }else{
                String firstLine = line != null ? line : "";
                String[] columnNames = firstLine.split(",");
                StringBuilder header = new StringBuilder();
                for( int i = 0; i <columnNames.length; i++){
                    header.append("coluna").append(i+1);
                    if(i < columnNames.length -1){
                        header.append(",");
                    }
                }
                data.add(header.toString());
                if(line != null){
                    data.add(br.readLine());
                }
            }
            return data;
        }catch (IOException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public List<DePara> uploadFileDePara(MultipartFile file, Long idColuna) {
        Coluna coluna = colunaService.buscarPorId(idColuna);
        upload(file);
        List<DePara> deParas = new ArrayList<>();

        try{
            BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
            String line;
            while((line = br.readLine()) != null){

                String[] aux = new String[3];
                if(line.contains(";")){
                    aux = line.split(";");
                } else if (line.contains(",")) {
                    aux = line.split(",");
                }

                DePara dePara = new DePara();
                dePara.setColuna(coluna);
                dePara.setSinal(aux[0].replace("\"", "").trim());
                dePara.setValorPadrao(aux[1].replace("\"", "").trim());
                dePara.setValorResultado(aux[2].replace("\"", "").trim());
                deParas.add(deParaService.create(dePara));

            }
        }catch (IOException e){
            System.out.println("Erro de Input");
        }
        return deParas;
    }

    public void upload(MultipartFile file){
        if(file.isEmpty()){
            throw new RuntimeException("Arquivo vazio");
        }
        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new RuntimeException("Tamanho de arquivo excedido;");
        }
    }
}
