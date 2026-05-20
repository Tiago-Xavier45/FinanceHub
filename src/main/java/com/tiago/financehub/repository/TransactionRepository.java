package com.tiago.financehub.repository;

import com.tiago.financehub.entity.Transaction;
import com.tiago.financehub.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByOrderByDateDesc();

    @Query("SELECT COALESCE(SUM(t.value), 0) FROM Transaction t WHERE t.type = :type AND t.date BETWEEN :start AND :end")
    BigDecimal sumByTypeAndDateBetween(
            @Param("type") TransactionType type,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end);

    @Query("SELECT t.category.name, SUM(t.value) FROM Transaction t WHERE t.type = 'EXPENSE' GROUP BY t.category.name")
    List<Object[]> sumExpensesByCategory();

    List<Transaction> findTop10ByOrderByDateDesc();
}
