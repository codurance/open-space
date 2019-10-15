package com.codurance.open_space.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @ManyToOne
    private Space location;
    private String time;
    private String presenter;
    @Column(columnDefinition = "varchar(255) default 'OTHER'", nullable = false)
    private String type;

    @ManyToMany(mappedBy = "likedSessions")
    Set<User> likes;

}
