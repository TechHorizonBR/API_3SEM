package com.api.nextschema.NextSchema.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Schema {
    private String nomeMetadata;
    private List<Coluna> colunaList = new ArrayList<Coluna>();

    @Override
    public String toString() {
        return  "database:\n" +
                "  nome: " + nomeMetadata +
                "  tables: " + colunaListToString();
    }

    public String colunaListToString(){
        return colunaList.stream().toString();
    }
}
