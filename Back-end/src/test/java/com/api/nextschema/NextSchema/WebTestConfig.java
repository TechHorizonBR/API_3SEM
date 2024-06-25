package com.api.nextschema.NextSchema;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.reactive.server.WebTestClient;

@TestConfiguration
public class WebTestConfig {

    @Bean
    public WebTestClient webTestClient() {
        return WebTestClient.bindToServer().baseUrl("http://localhost").build();
    }
}
