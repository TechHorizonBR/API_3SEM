package com.api.nextschema.NextSchema.web.controller;

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

    @GetMapping("/quantityStatus")
    public ResponseEntity<Map<Validado, Integer>> getQuantityStatus(@RequestBody List<Long> idEmpresas){
        return ResponseEntity.status(HttpStatus.OK).body(dashService.getQuantityStatus(idEmpresas));
    }
}
