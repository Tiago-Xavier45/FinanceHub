package com.tiago.financehub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tenants")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String schema;

    public Tenant() {}

    public Tenant(String name, String schema) {
        this.name = name;
        this.schema = schema;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSchema() { return schema; }

    public void setName(String name) { this.name = name; }
    public void setSchema(String schema) { this.schema = schema; }
}
