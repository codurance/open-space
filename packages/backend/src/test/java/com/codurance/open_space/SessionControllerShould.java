package com.codurance.open_space;

import com.codurance.open_space.controller.SessionController;
import com.codurance.open_space.domain.Session;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SessionRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static com.codurance.helpers.TestUtils.asJsonString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SessionController.class)
public class SessionControllerShould {
    private static final String API_PATH = "/api/sessions";
    private static final String API_SESSION_1_PATH = "/api/sessions/1";

    private Session session;
    private Space space;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SessionRepository repository;

    @BeforeEach
    void setUp() {
        space = new Space();
        space.setId(1L);
        space.setName("Space 1");

        session = new Session();
        session.setId(1L);
        session.setTitle("Session 1");
        session.setLocation(space);
        session.setTime("11:00");
        session.setPresenter("David");
    }

    @Test
    void get_all_open_space_sessions_from_the_repository() throws Exception {
        when(repository.findAll())
                .thenReturn(List.of(session));

        mockMvc.perform(get(API_PATH)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Session 1"))
                .andExpect(jsonPath("$[0].location.id").value("1"))
                .andExpect(jsonPath("$[0].location.name").value("Space 1"))
                .andExpect(jsonPath("$[0].time").value("11:00"))
                .andExpect(jsonPath("$[0].presenter").value("David"));
    }

    @Test
    void post_open_space_session() throws Exception {
        when(repository.save(session))
                .thenReturn(session);

        mockMvc.perform(post(API_PATH)
                .content(asJsonString(session))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Session 1"))
                .andExpect(jsonPath("$.location.id").value("1"))
                .andExpect(jsonPath("$.location.name").value("Space 1"))
                .andExpect(jsonPath("$.time").value("11:00"))
                .andExpect(jsonPath("$.presenter").value("David"));
    }

    @Test
    void update_open_space_session() throws Exception {
        when(repository.findById(1))
                .thenReturn(Optional.of(session));

        Space differentSpace = new Space();
        differentSpace.setId(2L);
        differentSpace.setName("Another space");

        Session sessionUpdated = new Session(
                session.getId(),
                session.getTitle(),
                session.getLocation(),
                session.getTime(),
                session.getPresenter());
        sessionUpdated.setLocation(differentSpace);

        when(repository.save(sessionUpdated))
                .thenReturn(sessionUpdated);

        mockMvc.perform(put(API_SESSION_1_PATH)
                .content(asJsonString(sessionUpdated))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Session 1"))
                .andExpect(jsonPath("$.location.id").value("2"))
                .andExpect(jsonPath("$.location.name").value("Another space"))
                .andExpect(jsonPath("$.time").value("11:00"))
                .andExpect(jsonPath("$.presenter").value("David"));

        verify(repository).findById(1);
        verify(repository).save(sessionUpdated);
    }

    @Test
    void update_method_returns_404_status_if_id_not_found() throws Exception {

        when(repository.findById(20)).thenReturn(null);

        Space differentSpace = new Space();
        differentSpace.setId(2L);
        differentSpace.setName("Another space");

        Session sessionUpdated = new Session(
                session.getId(),
                session.getTitle(),
                session.getLocation(),
                session.getTime(),
                session.getPresenter());
        sessionUpdated.setLocation(differentSpace);

        mockMvc.perform(put(API_SESSION_1_PATH)
                .content(asJsonString(sessionUpdated))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(repository).findById(1);
    }


    @Test
    void delete_method_returns_404_status_if_id_not_found() throws Exception {
        final int id = 30;

        doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(id);

        mockMvc.perform(delete("/api/sessions/" + id))
                .andExpect(status().isNotFound());

        verify(repository).deleteById(id);
    }

    @Test
    void delete_open_space_session_by_id() throws Exception {
        mockMvc.perform(delete(API_SESSION_1_PATH))
                .andExpect(status().isNoContent());

        verify(repository).deleteById(1);
    }
}
