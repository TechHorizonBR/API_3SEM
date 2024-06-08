package com.api.nextschema.NextSchema;

import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioEmpresaTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioEmpresaService usuarioEmpresaService;

    @Test
    public void testCreateUsuarioEmpresa() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        // Configure the UsuarioEmpresaService mock
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());

        // Perform the request
        mockMvc.perform(MockMvcRequestBuilders.post("/usuarioEmpresa")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1 }"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
    }



}