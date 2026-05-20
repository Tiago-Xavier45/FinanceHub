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
                .map(c -> new CategoryResponseDTO(c.getId(), c.getName()))
                .toList();
    }

    public CategoryResponseDTO salvar(CategoryRequestDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        Category saved = repository.save(category);
        return new CategoryResponseDTO(saved.getId(), saved.getName());
    }

    public CategoryResponseDTO atualizar(Long id, CategoryRequestDTO dto) {
        Category category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(dto.getName());
        Category saved = repository.save(category);
        return new CategoryResponseDTO(saved.getId(), saved.getName());
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }
        repository.deleteById(id);
    }
}
