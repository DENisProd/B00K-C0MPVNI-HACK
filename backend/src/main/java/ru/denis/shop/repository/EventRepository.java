package ru.denis.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.denis.shop.models.Event;
import ru.denis.shop.models.User;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e WHERE e.teamA.user1.id = :userId OR e.teamA.user2.id = :userId")
    List<Event> getEventsByTeamAUser(@Param("userId") Long userId);

    @Query("SELECT e FROM Event e WHERE e.teamB.user1.id = :userId OR e.teamB.user2.id = :userId")
    List<Event> getEventsByTeamBUser(@Param("userId") Long userId);
}