package ru.denis.shop.payload.response;

import lombok.Getter;
import lombok.Setter;
import ru.denis.shop.models.Invitation;

import java.util.List;

@Getter
@Setter
public class UserProfileResponse {
    private Long userId;
    private String lastName;
    private String email;
    private List<EventResponse> userEvents;
    private List<Invitation> userInvitations;
}
