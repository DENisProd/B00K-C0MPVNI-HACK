package ru.denis.shop.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Required;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@TableGenerator(name = "team_id_generator", initialValue = 1)
public class Team {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "team_id_generator")
    private Long id;
    private String name;
    private String image;
    private String homeTable;
    private String shootStyle;
    private Integer gamesCount = 0;
    private Integer winCount = 0;

    @OneToOne
    @NotNull
    private User author;

    @OneToOne
    private User user1;

    @OneToOne
    private User user2;
}
