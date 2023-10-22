package ru.denis.shop.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.denis.shop.exceptions.TeamNotFoundException;
import ru.denis.shop.exceptions.UserNotFoundException;
import ru.denis.shop.models.Event;
import ru.denis.shop.models.Team;
import ru.denis.shop.models.User;
import ru.denis.shop.payload.request.TeamCreateRequest;
import ru.denis.shop.payload.request.TeamUpdateRequest;
import ru.denis.shop.services.TeamService;
import ru.denis.shop.services.UserDetailsImpl;

import java.util.List;

@RestController
@RequestMapping("/teams")
@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    @SecurityRequirement(name = "Bearer Authentication")
    public Team createTeam(@RequestBody TeamCreateRequest teamCreateRequest) {
        UserDetailsImpl userImp = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return teamService.createTeam(teamCreateRequest, userImp);
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/user/{id}")
    public List<Event> getAllTeamsByUser() {
        UserDetailsImpl userImp = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return teamService.getAllByUserId(userImp.getId());
    }

    @PutMapping
    public ResponseEntity<?> updateTeam(@RequestBody TeamUpdateRequest teamUpdateRequest) {
        try {
            Team updatedTeam = teamService.updateTeam(teamUpdateRequest);
            return ResponseEntity.ok(updatedTeam);
        } catch (TeamNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{teamId}/increase-games-count")
    public ResponseEntity<?> increaseGamesCount(@PathVariable Long teamId) {
        try {
            Team updatedTeam = teamService.increaseGamesCount(teamId);
            return ResponseEntity.ok(updatedTeam);
        } catch (TeamNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{teamId}/increase-win-count")
    public ResponseEntity<?> increaseWinCount(@PathVariable Long teamId) {
        try {
            Team updatedTeam = teamService.increaseWinCount(teamId);
            return ResponseEntity.ok(updatedTeam);
        } catch (TeamNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
    }
}
