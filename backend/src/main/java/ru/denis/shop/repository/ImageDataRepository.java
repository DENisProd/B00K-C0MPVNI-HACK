package ru.denis.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.denis.shop.models.ImageData;

import java.util.Optional;

public interface ImageDataRepository extends JpaRepository<ImageData, Long> {
    Optional<ImageData> findByName(String name);
}
