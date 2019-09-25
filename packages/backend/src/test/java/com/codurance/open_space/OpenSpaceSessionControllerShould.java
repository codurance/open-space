package com.codurance.open_space;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OpenSpaceSessionController.class)
public class OpenSpaceSessionControllerShould {
    private static final String API_PATH = "/api/sessions";
    private static final String API_SESSION_1_PATH = "/api/sessions/1";

    private OpenSpaceSession openSpaceSession;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OpenSpaceSessionRepository repository;

    @BeforeEach
    void setUp() {
        openSpaceSession = new OpenSpaceSession(1, "Session 1", "Location 1", "11:00", "David");
    }

    @Test
    void get_all_open_space_sessions_from_the_repository() throws Exception {
        final String expectedJson = "[{\"id\":1,\"title\":\"Session 1\",\"location\":\"Location 1\",\"time\":\"11:00\",\"presenter\":\"David\"}]";

        when(repository.findAll())
                .thenReturn(List.of(openSpaceSession));

        mockMvc.perform(get(API_PATH)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));
    }

    @Test
    void post_open_space_session() throws Exception {
        when(repository.save(openSpaceSession))
                .thenReturn(openSpaceSession);

        mockMvc.perform(post(API_PATH)
                .content(asJsonString(openSpaceSession))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Session 1"))
                .andExpect(jsonPath("$.location").value("Location 1"))
                .andExpect(jsonPath("$.time").value("11:00"))
                .andExpect(jsonPath("$.presenter").value("David"));
    }

    private static String asJsonString(final Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

    @Test
    void update_open_space_session() throws Exception {
        when(repository.findById(1))
                .thenReturn(Optional.of(openSpaceSession));

        OpenSpaceSession openSpaceSessionUpdated = new OpenSpaceSession(
                openSpaceSession.getId(),
                openSpaceSession.getTitle(),
                openSpaceSession.getLocation(),
                openSpaceSession.getTime(),
                openSpaceSession.getPresenter());
        openSpaceSessionUpdated.setLocation("Location 2");

        when(repository.save(openSpaceSessionUpdated))
                .thenReturn(openSpaceSessionUpdated);

        mockMvc.perform(put(API_SESSION_1_PATH)
                .content(asJsonString(openSpaceSessionUpdated))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Session 1"))
                .andExpect(jsonPath("$.location").value("Location 2"))
                .andExpect(jsonPath("$.time").value("11:00"))
                .andExpect(jsonPath("$.presenter").value("David"));

        verify(repository).findById(1);
        verify(repository).save(openSpaceSessionUpdated);
    }

    @Test
    void update_method_returns_404_status_if_id_not_found() throws Exception {

        when(repository.findById(20)).thenReturn(null);

        OpenSpaceSession openSpaceSessionUpdated = new OpenSpaceSession(
                openSpaceSession.getId(),
                openSpaceSession.getTitle(),
                openSpaceSession.getLocation(),
                openSpaceSession.getTime(),
                openSpaceSession.getPresenter());
        openSpaceSessionUpdated.setLocation("Location 2");

        mockMvc.perform(put(API_SESSION_1_PATH)
                .content(asJsonString(openSpaceSessionUpdated))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(repository).findById(1);
    }

    @Test
    void delete_open_space_session_by_id() throws Exception {
        mockMvc.perform(delete(API_SESSION_1_PATH))
                .andExpect(status().is2xxSuccessful());

        verify(repository).deleteById(1);
    }
}
