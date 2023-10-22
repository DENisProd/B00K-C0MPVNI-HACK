package ru.denis.shop.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamUpdateRequest {
    private String name;
    private String image;
    private Long id;
    private Long user1;
    private Long user2;
}
