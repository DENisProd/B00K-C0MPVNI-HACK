package ru.denis.shop.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventResponse {
    private Long id;
    private Long teamAId;
    private Long teamBId;
    private String type;
    private Long winnerId;
    private String homeTable;
    private String shootStyle;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer scoreA;
    private Integer scoreB;
    private String location;
}
