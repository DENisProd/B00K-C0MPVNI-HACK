package ru.denis.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.denis.shop.models.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
    // Дополнительные методы могут быть добавлены по мере необходимости
}
