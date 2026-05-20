package com.tiago.financehub.service;

import com.tiago.financehub.dto.*;
import com.tiago.financehub.entity.*;
import com.tiago.financehub.enums.TransactionType;
import com.tiago.financehub.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final GoalRepository goalRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    public DashboardService(TransactionRepository transactionRepository,
                            GoalRepository goalRepository,
                            AccountRepository accountRepository,
                            CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.goalRepository = goalRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
    }

    public Map<String, Object> getSummary() {
        LocalDate now = LocalDate.now();
        LocalDate monthStart = now.withDayOfMonth(1);
        LocalDate monthEnd = now.withDayOfMonth(now.lengthOfMonth());

        BigDecimal income = transactionRepository.sumByTypeAndDateBetween(TransactionType.INCOME, monthStart, monthEnd);
        BigDecimal expense = transactionRepository.sumByTypeAndDateBetween(TransactionType.EXPENSE, monthStart, monthEnd);
        BigDecimal balance = income.subtract(expense);
        BigDecimal invested = accountRepository.findAll().stream()
                .map(Account::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("balance", balance);
        summary.put("income", income);
        summary.put("expense", expense);
        summary.put("invested", invested);
        return summary;
    }

    public List<Map<String, Object>> getExpensesByCategory() {
        List<Object[]> result = transactionRepository.sumExpensesByCategory();
        return result.stream().map(row -> {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("category", row[0]);
            item.put("value", row[1]);
            return item;
        }).toList();
    }

    public List<TransactionResponseDTO> getRecentTransactions() {
        return transactionRepository.findTop10ByOrderByDateDesc().stream()
                .map(t -> new TransactionResponseDTO(
                        t.getId(),
                        t.getType().name(),
                        t.getValue(),
                        t.getDate(),
                        t.getDescription(),
                        t.getCategory() != null ? t.getCategory().getName() : null
                ))
                .toList();
    }

    public List<GoalDTO> getGoals() {
        return goalRepository.findAll().stream()
                .map(g -> new GoalDTO(g.getId(), g.getName(), g.getTargetValue(), g.getCurrentValue(), g.getDeadline()))
                .toList();
    }

    public List<AccountDTO> getAccounts() {
        return accountRepository.findAll().stream()
                .map(a -> new AccountDTO(a.getId(), a.getName(), a.getBank(), a.getBalance()))
                .toList();
    }
}
