package com.tiago.financehub.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class TenantSetupService {

    private final JdbcTemplate jdbcTemplate;

    public TenantSetupService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void createSchema(String schemaName) {
        jdbcTemplate.execute("CREATE SCHEMA IF NOT EXISTS " + schemaName);

        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS %s.categories (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )
        """.formatted(schemaName));
    }
}
