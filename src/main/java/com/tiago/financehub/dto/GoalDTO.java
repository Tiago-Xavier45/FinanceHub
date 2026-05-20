package com.tiago.financehub.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class GoalDTO {
    private Long id;
    private String name;
    private BigDecimal targetValue;
    private BigDecimal currentValue;
    private LocalDate deadline;
    private double progress;

    public GoalDTO() {}

    public GoalDTO(Long id, String name, BigDecimal targetValue, BigDecimal currentValue, LocalDate deadline) {
        this.id = id;
        this.name = name;
        this.targetValue = targetValue;
        this.currentValue = currentValue;
        this.deadline = deadline;
        this.progress = targetValue.compareTo(BigDecimal.ZERO) > 0
                ? currentValue.divide(targetValue, 4, java.math.RoundingMode.HALF_UP).doubleValue() * 100
                : 0;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getTargetValue() { return targetValue; }
    public BigDecimal getCurrentValue() { return currentValue; }
    public LocalDate getDeadline() { return deadline; }
    public double getProgress() { return progress; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setTargetValue(BigDecimal targetValue) { this.targetValue = targetValue; }
    public void setCurrentValue(BigDecimal currentValue) { this.currentValue = currentValue; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}
