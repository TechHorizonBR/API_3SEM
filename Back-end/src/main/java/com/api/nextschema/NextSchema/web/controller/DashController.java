package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.entity.Coluna;
import com.api.nextschema.NextSchema.enums.Validado;
import com.api.nextschema.NextSchema.service.DashService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RestController
@RequestMapping("/dash")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DashController {
    private final DashService dashService;

    @PostMapping("/quantityStatus")
    public ResponseEntity<Map<Validado, Integer>> getQuantityStatus(@RequestBody List<Long> idEmpresas){
        return ResponseEntity.status(HttpStatus.OK).body(dashService.getQuantityStatus(idEmpresas));
    }
  
    @PostMapping("/quantityTypeData")
    public ResponseEntity<Map<String, Integer>> getQuantityTypeData(@RequestBody List<Long> idEmpresas){
        return ResponseEntity.ok().body(dashService.getQuantityTypeData(idEmpresas));

    }

    @PostMapping("/quantityEmpresas")
    public ResponseEntity<Integer> getQuantityEmpresas(){
        return ResponseEntity.ok().body(dashService.getQuantityEmpresas());
    }

    @PostMapping("/quantityUsers")
    public ResponseEntity<Integer> getQuantityUsersByEmpresa(@RequestBody List<Long> idEmpresas){
        return ResponseEntity.ok().body(dashService.getQuantityUsersByEmpresas(idEmpresas));
    }
  
    @PostMapping("/quantityColunas")
    public ResponseEntity<Map<String, Integer>> getQuantityColunasByEmpresa(@RequestBody List<Long> idEmpresa) {
        Map<String, Integer> result = dashService.getQuantityColunasByEmpresa(idEmpresa);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/quantityByStage")
    public ResponseEntity<Map<String, Integer>> getQuantityByStage(@RequestBody List<Long> idEmpresas){
        return ResponseEntity.ok().body(dashService.getQuantityByStage(idEmpresas));
    }
}
