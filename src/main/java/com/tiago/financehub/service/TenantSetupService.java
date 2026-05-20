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

        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS %s.transactions (
                id BIGSERIAL PRIMARY KEY,
                type VARCHAR(20) NOT NULL,
                value DECIMAL(12,2) NOT NULL,
                date DATE NOT NULL,
                description VARCHAR(255),
                category_id BIGINT REFERENCES %s.categories(id)
            )
        """.formatted(schemaName, schemaName));

        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS %s.goals (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                target_value DECIMAL(12,2) NOT NULL,
                current_value DECIMAL(12,2) NOT NULL,
                deadline DATE
            )
        """.formatted(schemaName));

        jdbcTemplate.execute("""
            CREATE TABLE IF NOT EXISTS %s.accounts (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                bank VARCHAR(255),
                balance DECIMAL(12,2) NOT NULL
            )
        """.formatted(schemaName));
    }
}
