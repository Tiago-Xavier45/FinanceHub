package com.tiago.financehub.controller;

import com.tiago.financehub.dto.CategoryRequestDTO;
import com.tiago.financehub.dto.CategoryResponseDTO;
import com.tiago.financehub.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryResponseDTO> listar() {
        return service.listar();
    }

    @PostMapping
    public CategoryResponseDTO salvar(
            @RequestBody CategoryRequestDTO dto
    ) {
        return service.salvar(dto);
    }
}