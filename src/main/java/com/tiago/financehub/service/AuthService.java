package com.tiago.financehub.service;

import com.tiago.financehub.dto.AuthResponseDTO;
import com.tiago.financehub.dto.LoginRequestDTO;
import com.tiago.financehub.dto.RegisterRequestDTO;
import com.tiago.financehub.entity.Role;
import com.tiago.financehub.entity.Tenant;
import com.tiago.financehub.entity.User;
import com.tiago.financehub.repository.RoleRepository;
import com.tiago.financehub.repository.TenantRepository;
import com.tiago.financehub.repository.UserRepository;
import com.tiago.financehub.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final TenantSetupService tenantSetupService;

    public AuthService(UserRepository userRepository,
                       TenantRepository tenantRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider,
                       TenantSetupService tenantSetupService) {
        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.tenantSetupService = tenantSetupService;
    }

    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        String schemaName = "tenant_" + dto.getTenantName().toLowerCase().replaceAll("\\s+", "_");

        Tenant tenant = new Tenant(dto.getTenantName(), schemaName);
        tenant = tenantRepository.save(tenant);

        tenantSetupService.createSchema(schemaName);

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setTenant(tenant);
        user.setRoles(Set.of(userRole));
        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), schemaName);

        return new AuthResponseDTO(token, user.getEmail(), user.getName(), schemaName);
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(
                user.getId(), user.getEmail(), user.getTenant().getSchema());

        return new AuthResponseDTO(token, user.getEmail(), user.getName(), user.getTenant().getSchema());
    }
}
