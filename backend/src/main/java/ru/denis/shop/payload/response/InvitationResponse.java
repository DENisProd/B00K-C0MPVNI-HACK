package ru.denis.shop.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvitationResponse {
    private Long invitationId;
    private String invitationCode;
    private Long teamId;
    private String teamName;
}
