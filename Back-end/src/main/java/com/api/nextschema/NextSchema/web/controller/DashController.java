package com.api.nextschema.NextSchema.web.controller;

import com.api.nextschema.NextSchema.service.DashService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/dash")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DashController {
    private final DashService dashService;
}
