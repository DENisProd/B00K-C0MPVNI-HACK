package ru.denis.shop.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Team teamA;

    @ManyToOne
    private Team teamB;

    @ManyToOne
    private User author;

    @Enumerated(EnumType.STRING)
    private EMatchType  type;

    @ManyToOne
    private Team winner;

    private String homeTable;
    private String shootStyle;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer scoreA = 0;
    private Integer scoreB = 0;
    private String location;
}
