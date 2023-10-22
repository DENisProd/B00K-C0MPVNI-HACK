package ru.denis.shop.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.denis.shop.models.Event;
import ru.denis.shop.payload.request.EventCreateRequest;
import ru.denis.shop.services.EventService;
import ru.denis.shop.services.UserDetailsImpl;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/user/{id}")
    public List<Event> getAllEventsByUser() {
        UserDetailsImpl userImp = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return eventService.getAllEventsByUserId(userImp.getId());
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public Event createEvent(@RequestBody EventCreateRequest eventCreateRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return eventService.createEvent(eventCreateRequest, userDetails);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return eventService.updateEvent(id, updatedEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
