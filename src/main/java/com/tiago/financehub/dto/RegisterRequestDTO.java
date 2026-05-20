package com.tiago.financehub.dto;

public class RegisterRequestDTO {

    private String name;
    private String email;
    private String password;
    private String tenantName;

    public RegisterRequestDTO() {}

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getTenantName() { return tenantName; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setTenantName(String tenantName) { this.tenantName = tenantName; }
}
