package ru.denis.shop.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invitationCode;

    @ManyToOne
    private User invitedUser;

    @ManyToOne
    private Team team;
}
