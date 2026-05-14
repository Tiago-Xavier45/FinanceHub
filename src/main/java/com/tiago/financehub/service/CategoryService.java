package com.tiago.financehub.service;

import com.tiago.financehub.dto.CategoryRequestDTO;
import com.tiago.financehub.dto.CategoryResponseDTO;
import com.tiago.financehub.entity.Category;
import com.tiago.financehub.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryResponseDTO> listar() {

        return repository.findAll()
                .stream()
                .map(category -> new CategoryResponseDTO(
                        category.getId(),
                        category.getName()
                ))
                .toList();
    }

    public CategoryResponseDTO salvar(CategoryRequestDTO dto) {

        Category category = new Category();

        category.setName(dto.getName());

        Category savedCategory = repository.save(category);

        return new CategoryResponseDTO(
                savedCategory.getId(),
                savedCategory.getName()
        );
    }
}