package com.tiago.financehub.controller;

import com.tiago.financehub.dto.AccountDTO;
import com.tiago.financehub.dto.GoalDTO;
import com.tiago.financehub.dto.TransactionResponseDTO;
import com.tiago.financehub.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/expenses-by-category")
    public ResponseEntity<List<Map<String, Object>>> expensesByCategory() {
        return ResponseEntity.ok(service.getExpensesByCategory());
    }

    @GetMapping("/recent-transactions")
    public ResponseEntity<List<TransactionResponseDTO>> recentTransactions() {
        return ResponseEntity.ok(service.getRecentTransactions());
    }

    @GetMapping("/goals")
    public ResponseEntity<List<GoalDTO>> goals() {
        return ResponseEntity.ok(service.getGoals());
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> accounts() {
        return ResponseEntity.ok(service.getAccounts());
    }
}
