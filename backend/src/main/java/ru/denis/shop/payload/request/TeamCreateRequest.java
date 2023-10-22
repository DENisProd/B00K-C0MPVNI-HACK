package ru.denis.shop.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamCreateRequest {
    private String name;
    private String image;
    private String homeTable;
    private String shootStyle;
    private Long user1;
    private Long user2;
}
