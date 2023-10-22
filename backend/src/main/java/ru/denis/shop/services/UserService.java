package ru.denis.shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.shop.exceptions.UserNotFoundException;
import ru.denis.shop.models.Event;
import ru.denis.shop.models.Invitation;
import ru.denis.shop.models.User;
import ru.denis.shop.payload.response.UserProfileResponse;
import ru.denis.shop.repository.EventRepository;
import ru.denis.shop.repository.InvitationRepository;
import ru.denis.shop.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final InvitationRepository invitationRepository;

    public UserProfileResponse getUserProfile(Long userId) {
        // Получение основной информации о пользователе
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

        // Получение приглашений в команду пользователя
        List<Invitation> userInvitations = invitationRepository.getInvitationsByInvitedUser_Id(userId);

        // Создание объекта UserProfileDTO
        UserProfileResponse userProfile = new UserProfileResponse();
        userProfile.setUserId(user.getId());
        userProfile.setLastName(user.getLastName());
        userProfile.setEmail(user.getEmail());
        userProfile.setUserInvitations(userInvitations);

        return userProfile;
    }
}
