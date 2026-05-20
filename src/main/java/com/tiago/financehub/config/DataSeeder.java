package com.tiago.financehub.config;

import com.tiago.financehub.entity.*;
import com.tiago.financehub.enums.TransactionType;
import com.tiago.financehub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;
    private final GoalRepository goalRepository;
    private final AccountRepository accountRepository;

    public DataSeeder(CategoryRepository categoryRepository,
                      TransactionRepository transactionRepository,
                      GoalRepository goalRepository,
                      AccountRepository accountRepository) {
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
        this.goalRepository = goalRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) return;

        Category moradia = saveCategory("Moradia");
        Category alimentacao = saveCategory("Alimentação");
        Category lazer = saveCategory("Lazer");
        Category transporte = saveCategory("Transporte");
        Category saude = saveCategory("Saúde");
        Category salario = saveCategory("Salário");
        Category investimentos = saveCategory("Investimentos");

        saveTransaction(TransactionType.INCOME, new BigDecimal("8500.00"), LocalDate.now().withDayOfMonth(5), "Salário", salario);
        saveTransaction(TransactionType.INCOME, new BigDecimal("1200.00"), LocalDate.now().withDayOfMonth(15), "Freelance", null);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("1800.00"), LocalDate.now().withDayOfMonth(1), "Aluguel", moradia);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("350.00"), LocalDate.now().withDayOfMonth(2), "Supermercado", alimentacao);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("120.00"), LocalDate.now().withDayOfMonth(3), "Gasolina", transporte);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("250.00"), LocalDate.now().withDayOfMonth(4), "Jantar fora", lazer);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("89.90"), LocalDate.now().withDayOfMonth(6), "Plano de saúde", saude);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("45.00"), LocalDate.now().withDayOfMonth(7), "Uber", transporte);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("200.00"), LocalDate.now().withDayOfMonth(8), "Farmácia", saude);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("600.00"), LocalDate.now().withDayOfMonth(10), "Curso online", null);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("1500.00"), LocalDate.now().minusMonths(1).withDayOfMonth(1), "Aluguel", moradia);
        saveTransaction(TransactionType.EXPENSE, new BigDecimal("280.00"), LocalDate.now().minusMonths(1).withDayOfMonth(2), "Supermercado", alimentacao);

        saveGoal("Viagem para o Japão", new BigDecimal("15000.00"), new BigDecimal("3200.00"), LocalDate.of(2027, 3, 1));
        saveGoal("MacBook Pro", new BigDecimal("18000.00"), new BigDecimal("4500.00"), LocalDate.of(2026, 12, 1));
        saveGoal("Curso de Inglês", new BigDecimal("5000.00"), new BigDecimal("1500.00"), LocalDate.of(2026, 8, 1));
        saveGoal("Carro", new BigDecimal("60000.00"), new BigDecimal("8000.00"), LocalDate.of(2027, 6, 1));

        saveAccount("Nubank", "Nu Pagamentos", new BigDecimal("4520.30"));
        saveAccount("Conta Corrente", "Banco do Brasil", new BigDecimal("12800.00"));
        saveAccount("Investimentos", "XP Investimentos", new BigDecimal("35000.00"));
    }

    private Category saveCategory(String name) {
        Category c = new Category();
        c.setName(name);
        return categoryRepository.save(c);
    }

    private void saveTransaction(TransactionType type, BigDecimal value, LocalDate date, String description, Category category) {
        Transaction t = new Transaction();
        t.setType(type);
        t.setValue(value);
        t.setDate(date);
        t.setDescription(description);
        t.setCategory(category);
        transactionRepository.save(t);
    }

    private void saveGoal(String name, BigDecimal target, BigDecimal current, LocalDate deadline) {
        Goal g = new Goal();
        g.setName(name);
        g.setTargetValue(target);
        g.setCurrentValue(current);
        g.setDeadline(deadline);
        goalRepository.save(g);
    }

    private void saveAccount(String name, String bank, BigDecimal balance) {
        Account a = new Account();
        a.setName(name);
        a.setBank(bank);
        a.setBalance(balance);
        accountRepository.save(a);
    }
}
