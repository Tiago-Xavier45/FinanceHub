package com.tiago.financehub.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class AccountDTO {
    private Long id;
    private String name;
    private String bank;
    private BigDecimal balance;

    public AccountDTO() {}

    public AccountDTO(Long id, String name, String bank, BigDecimal balance) {
        this.id = id; this.name = name; this.bank = bank; this.balance = balance;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getBank() { return bank; }
    public BigDecimal getBalance() { return balance; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setBank(String bank) { this.bank = bank; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}
