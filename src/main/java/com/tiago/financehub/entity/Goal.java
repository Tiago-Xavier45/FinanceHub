package com.tiago.financehub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal targetValue;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal currentValue;

    private LocalDate deadline;

    public Goal() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getTargetValue() { return targetValue; }
    public BigDecimal getCurrentValue() { return currentValue; }
    public LocalDate getDeadline() { return deadline; }

    public void setName(String name) { this.name = name; }
    public void setTargetValue(BigDecimal targetValue) { this.targetValue = targetValue; }
    public void setCurrentValue(BigDecimal currentValue) { this.currentValue = currentValue; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}
