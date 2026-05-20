package com.tiago.financehub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String bank;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal balance;

    public Account() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getBank() { return bank; }
    public BigDecimal getBalance() { return balance; }

    public void setName(String name) { this.name = name; }
    public void setBank(String bank) { this.bank = bank; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}
