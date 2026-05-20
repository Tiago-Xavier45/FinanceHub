package com.tiago.financehub.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponseDTO {
    private Long id;
    private String type;
    private BigDecimal value;
    private LocalDate date;
    private String description;
    private String categoryName;

    public TransactionResponseDTO() {}

    public TransactionResponseDTO(Long id, String type, BigDecimal value, LocalDate date,
                                   String description, String categoryName) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.date = date;
        this.description = description;
        this.categoryName = categoryName;
    }

    public Long getId() { return id; }
    public String getType() { return type; }
    public BigDecimal getValue() { return value; }
    public LocalDate getDate() { return date; }
    public String getDescription() { return description; }
    public String getCategoryName() { return categoryName; }

    public void setId(Long id) { this.id = id; }
    public void setType(String type) { this.type = type; }
    public void setValue(BigDecimal value) { this.value = value; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setDescription(String description) { this.description = description; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
