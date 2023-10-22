package ru.denis.shop.payload.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class EventCreateRequest {
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
