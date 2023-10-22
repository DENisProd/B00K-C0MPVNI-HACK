package ru.denis.shop.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.denis.shop.exceptions.TeamNotFoundException;
import ru.denis.shop.exceptions.UserNotFoundException;
import ru.denis.shop.models.Team;
import ru.denis.shop.models.User;
import ru.denis.shop.payload.request.TeamCreateRequest;
import ru.denis.shop.payload.request.TeamUpdateRequest;
import ru.denis.shop.repository.TeamRepository;
import ru.denis.shop.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public Team createTeam(TeamCreateRequest teamCreateRequest, UserDetailsImpl userDetails) {
        Team team = new Team();
        team.setName(teamCreateRequest.getName());
        team.setImage(teamCreateRequest.getImage());
        team.setShootStyle(teamCreateRequest.getShootStyle());
        team.setHomeTable(teamCreateRequest.getHomeTable());

        // Проверка наличия автора
        Optional<User> authorOptional = userRepository.findById(userDetails.getId());
        if (authorOptional.isPresent()) {
            team.setUser1(authorOptional.get());
        } else {
            // Обработка случая, когда пользователь 1 не найден
            // Можно бросить исключение или принять другое решение в зависимости от вашей логики
        }

        // Проверка наличия пользователя 1
        Optional<User> user1Optional = userRepository.findById(teamCreateRequest.getUser1());
        if (user1Optional.isPresent()) {
            team.setUser1(user1Optional.get());
        } else {
            // Обработка случая, когда пользователь 1 не найден
            // Можно бросить исключение или принять другое решение в зависимости от вашей логики
        }

        // Проверка наличия пользователя 2
        Optional<User> user2Optional = userRepository.findById(teamCreateRequest.getUser2());
        if (user2Optional.isPresent()) {
            team.setUser2(user2Optional.get());
        } else {
            // Обработка случая, когда пользователь 2 не найден
            // Можно бросить исключение или принять другое решение в зависимости от вашей логики
        }

        return teamRepository.save(team);
    }

    public Team getTeamById(Long id) {
        return teamRepository.findById(id).orElse(null);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team updateTeam(TeamUpdateRequest teamUpdateRequest) {
        Optional<Team> teamOptional = teamRepository.findById(teamUpdateRequest.getId());

        if (teamOptional.isPresent()) {
            Team team = teamOptional.get();

            // Обновление полей команды
            team.setImage(teamUpdateRequest.getImage());
            team.setName(teamUpdateRequest.getName());

            // Проверка наличия пользователя 1
            Optional<User> user1Optional = userRepository.findById(teamUpdateRequest.getUser1());
            if (user1Optional.isPresent()) {
                team.setUser1(user1Optional.get());
            } else {
                throw new UserNotFoundException("Пользователь 1 не найден");
            }

            // Проверка наличия пользователя 2
            Optional<User> user2Optional = userRepository.findById(teamUpdateRequest.getUser2());
            if (user2Optional.isPresent()) {
                team.setUser2(user2Optional.get());
            } else {
                throw new UserNotFoundException("Пользователь 2 не найден");
            }

            return teamRepository.save(team);
        } else {
            throw new TeamNotFoundException("Команда не найдена");
        }
    }

    public List<Team> getAllByUserId(Long userId) {

    }

    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    public Team inviteUserToTeam(Long teamId, User user) {
        Team team = teamRepository.findById(teamId).orElse(null);
        if (team != null) {
            team.setUser2(user);
            return teamRepository.save(team);
        }
        return null;
    }

    public Team increaseGamesCount(Long teamId) {
        Team team = teamRepository.findById(teamId).orElse(null);
        if (team != null) {
            team.setGamesCount(team.getGamesCount() + 1);
            return teamRepository.save(team);
        }
        return null;
    }

    public Team increaseWinCount(Long teamId) {
        Team team = teamRepository.findById(teamId).orElse(null);
        if (team != null) {
            team.setWinCount(team.getWinCount() + 1);
            return teamRepository.save(team);
        }
        return null;
    }
}
