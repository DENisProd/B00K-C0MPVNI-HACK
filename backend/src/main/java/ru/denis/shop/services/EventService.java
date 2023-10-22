package ru.denis.shop.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.denis.shop.exceptions.InvalidRequestException;
import ru.denis.shop.exceptions.TeamNotFoundException;
import ru.denis.shop.exceptions.UserNotFoundException;
import ru.denis.shop.models.EMatchType;
import ru.denis.shop.models.Event;
import ru.denis.shop.models.User;
import ru.denis.shop.payload.request.EventCreateRequest;
import ru.denis.shop.repository.EventRepository;
import ru.denis.shop.repository.TeamRepository;
import ru.denis.shop.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getAllEventsByUserId(Long userId) {
        List<Event> eventsByTeamA = eventRepository.getEventsByTeamAUser(userId);
        List<Event> eventsByTeamB = eventRepository.getEventsByTeamBUser(userId);

        // Объединяем события из обеих команд и удаляем дубликаты (если они есть)
        List<Event> allEvents = Stream.concat(eventsByTeamA.stream(), eventsByTeamB.stream())
                .distinct()
                .collect(Collectors.toList());

        return allEvents;
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    @Transactional
    public Event createEvent(EventCreateRequest eventCreateRequest, UserDetails userDetails) {
        Event event = new Event();

        event.setTeamA(teamRepository.findById(eventCreateRequest.getTeamAId())
                .orElseThrow(() -> new TeamNotFoundException("Team with ID " + eventCreateRequest.getTeamAId() + " not found")));

        event.setTeamB(teamRepository.findById(eventCreateRequest.getTeamBId())
                .orElseThrow(() -> new TeamNotFoundException("Team with ID " + eventCreateRequest.getTeamBId() + " not found")));

        try {
            EMatchType matchType = EMatchType.valueOf(eventCreateRequest.getType());
            event.setType(matchType);
        } catch (IllegalArgumentException e) {
            throw new InvalidRequestException("Invalid match type: " + eventCreateRequest.getType());
        }

        if (eventCreateRequest.getWinnerId() != null) {
            event.setWinner(teamRepository.findById(eventCreateRequest.getWinnerId())
                    .orElseThrow(() -> new TeamNotFoundException("Team with ID " + eventCreateRequest.getWinnerId() + " not found")));
        }

        event.setHomeTable(eventCreateRequest.getHomeTable());
        event.setShootStyle(eventCreateRequest.getShootStyle());
        event.setStartTime(eventCreateRequest.getStartTime());
        event.setEndTime(eventCreateRequest.getEndTime());
        event.setScoreA(eventCreateRequest.getScoreA());
        event.setScoreB(eventCreateRequest.getScoreB());
        event.setLocation(eventCreateRequest.getLocation());

        User currentUser = userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new UserNotFoundException("Team with ID " + eventCreateRequest.getTeamBId() + " not found"));
        event.setAuthor(currentUser);

        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setTeamA(updatedEvent.getTeamA());
                    event.setTeamB(updatedEvent.getTeamB());
                    event.setType(updatedEvent.getType());
                    event.setWinner(updatedEvent.getWinner());
                    event.setStartTime(updatedEvent.getStartTime());
                    event.setEndTime(updatedEvent.getEndTime());
                    event.setScoreA(updatedEvent.getScoreA());
                    event.setScoreB(updatedEvent.getScoreB());
                    event.setLocation(updatedEvent.getLocation());
                    return eventRepository.save(event);
                })
                .orElseGet(() -> {
                    updatedEvent.setId(id);
                    return eventRepository.save(updatedEvent);
                });
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}