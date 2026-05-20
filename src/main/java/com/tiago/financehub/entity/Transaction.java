package com.tiago.financehub.entity;

import com.tiago.financehub.enums.TransactionType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal value;

    @Column(nullable = false)
    private LocalDate date;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public Transaction() {}

    public Long getId() { return id; }
    public TransactionType getType() { return type; }
    public BigDecimal getValue() { return value; }
    public LocalDate getDate() { return date; }
    public String getDescription() { return description; }
    public Category getCategory() { return category; }

    public void setId(Long id) { this.id = id; }
    public void setType(TransactionType type) { this.type = type; }
    public void setValue(BigDecimal value) { this.value = value; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setDescription(String description) { this.description = description; }
    public void setCategory(Category category) { this.category = category; }
}
