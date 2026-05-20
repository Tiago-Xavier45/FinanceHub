package com.tiago.financehub.repository;

import com.tiago.financehub.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
