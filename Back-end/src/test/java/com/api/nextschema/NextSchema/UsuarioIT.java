package com.api.nextschema.NextSchema;

import com.api.nextschema.NextSchema.enums.Role;
import com.api.nextschema.NextSchema.service.UsuarioRoleAssociationService;
import com.api.nextschema.NextSchema.web.dto.UsuarioCreateDTO;
import com.api.nextschema.NextSchema.web.dto.UsuarioResponseDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql(scripts = "/sql/usuario/usuario-insert.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/sql/usuario/usuario-delete.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class UsuarioIT {

    @Autowired
    WebTestClient testClient;
    @Autowired
    private UsuarioRoleAssociationService usuarioRoleAssociationService;

    @Test
    public void usuarioCreate_nomeSenhaValidos_Status201() {
        List<Role> roleUsuario = new ArrayList<>();
        roleUsuario.add(Role.ROLE_ADMIN);
        roleUsuario.add(Role.ROLE_LZ);
        roleUsuario.add(Role.ROLE_SILVER);
        roleUsuario.add(Role.ROLE_BRONZE);


        List<Long> listEmpresa = new ArrayList<>();
        listEmpresa.add(012L);
        listEmpresa.add(001L);


        UsuarioResponseDTO responseBody = testClient
                .post()
                .uri("/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new UsuarioCreateDTO( "anaP", roleUsuario, "anap@fatec.com", "1234", listEmpresa))
                .exchange()
                .expectStatus().isEqualTo(400)
                .expectBody(UsuarioResponseDTO.class)
                .returnResult().getResponseBody();

        org.assertj.core.api.Assertions.assertThat(responseBody).isNotNull();
        org.assertj.core.api.Assertions.assertThat(responseBody.getNome()).isEqualTo("anaP");
        org.assertj.core.api.Assertions.assertThat(responseBody.getEmail()).isEqualTo("anap@fatec.com");


    }


}


