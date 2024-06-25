package com.api.nextschema.NextSchema;

import com.api.nextschema.NextSchema.entity.UsuarioEmpresa;
import com.api.nextschema.NextSchema.service.UsuarioEmpresaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.MockMvcAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.*;


@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioEmpresaTest{

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioEmpresaService usuarioEmpresaService;
    @Autowired
    private MockMvcAutoConfiguration mockMvcAutoConfiguration;

    @Test
    public void testCreateUsuarioEmpresa() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());
        mockMvc.perform(MockMvcRequestBuilders.post("/usuarioEmpresa")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"id\": 1 }"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
    }

    @Test
    public void testDeleteUsuarioEmpresaComStatus200() throws Exception {
        doNothing().when(usuarioEmpresaService).deleteRegistroPorId(anyLong());
        mockMvc.perform(MockMvcRequestBuilders.delete("/usuarioEmpresa/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

    }

    @Test
    public void testBuscarUsuariosPorEmpresaComStatus200() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());
        mockMvc.perform(MockMvcRequestBuilders.get("/empresa/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));

    }

    @Test
    public void testBuscarUsuarioPorEmpresaComStatus404() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());
        mockMvc.perform(MockMvcRequestBuilders.put("/empresa/{id}", 900000L))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("404"));

    }

    @Test
    public void testbuscarEmpresaPorUsuarioComStatus200() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());
        mockMvc.perform(MockMvcRequestBuilders.get("/usuario/{id}", 1L))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));

    }

    @Test
    public void testbuscarEmpresaPorUsuarioComStatus404() throws Exception {
        UsuarioEmpresa usuarioEmpresa = new UsuarioEmpresa();
        usuarioEmpresa.setId(1L);
        doReturn(usuarioEmpresa).when(usuarioEmpresaService).criarRegistro(any());
        mockMvc.perform(MockMvcRequestBuilders.get("/empresa/{id}", 9000000L))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("404"));

    }
}