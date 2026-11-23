package com.huertohogar.service;

import com.huertohogar.entity.Product;
import com.huertohogar.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Import({ProductService.class})
class ProductServiceTest {
    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductService service;

    @BeforeEach
    void clean() {
        repository.deleteAll();
    }

    @Test
    void createAndFindProduct() {
        Product p = new Product();
        p.setName("Pepino");
        p.setDescription("Pepino fresco");
        p.setPrice(1.2);
        p.setQuantity(30);
        Product saved = service.create(p);
        assertNotNull(saved.getId());
        assertEquals(1, repository.count());
        Product fetched = service.findById(saved.getId()).orElseThrow();
        assertEquals("Pepino", fetched.getName());
    }

    @Test
    void updateProduct() {
        Product p = new Product();
        p.setName("Cebolla");
        p.setDescription("Cebolla roja");
        p.setPrice(0.5);
        p.setQuantity(20);
        Product saved = service.create(p);
        saved.setPrice(0.6);
        Product updated = service.update(saved.getId(), saved);
        assertEquals(0.6, updated.getPrice());
    }
}
