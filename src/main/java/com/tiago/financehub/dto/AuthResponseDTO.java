package com.tiago.financehub.dto;

public class AuthResponseDTO {

    private String token;
    private String email;
    private String name;
    private String tenant;

    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, String email, String name, String tenant) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.tenant = tenant;
    }

    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getTenant() { return tenant; }

    public void setToken(String token) { this.token = token; }
    public void setEmail(String email) { this.email = email; }
    public void setName(String name) { this.name = name; }
    public void setTenant(String tenant) { this.tenant = tenant; }
}
