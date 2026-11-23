package com.huertohogar.loader;

import com.huertohogar.entity.Product;
import com.huertohogar.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile({"dev", "prod"})
public class DataLoader implements CommandLineRunner {
    private final ProductRepository repository;

    public DataLoader(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            List<Product> initial = List.of(
                new Product(){ { setName("Tomate"); setDescription("Tomate rojo"); setPrice(1.5); setQuantity(100); } },
                new Product(){ { setName("Lechuga"); setDescription("Lechuga fresca"); setPrice(0.9); setQuantity(50); } },
                new Product(){ { setName("Zanahoria"); setDescription("Zanahoria orgánica"); setPrice(0.8); setQuantity(70); } }
            );
            repository.saveAll(initial);
        }
    }
}
