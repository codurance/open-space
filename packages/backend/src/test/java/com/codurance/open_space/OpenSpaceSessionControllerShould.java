package com.codurance.open_space;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OpenSpaceSessionController.class)
public class OpenSpaceSessionControllerShould {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OpenSpaceSessionRepository repository;

    @Test
    void get_all_open_space_sessions_from_the_repository() throws Exception {
        when(repository.findAll()).thenReturn(
                List.of(new OpenSpaceSession(
                        1,
                        "Session 1",
                        "Location 1",
                        "11:00",
                        "David")));

        mockMvc.perform(get("/api/sessions")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{\"id\":1,\"title\":\"Session 1\",\"location\":\"Location 1\",\"time\":\"11:00\",\"presenter\":\"David\"}]"));
    }

    @Test
    void post_open_space_session() throws Exception {
        when(repository.save(new OpenSpaceSession(
                1,
                "Session 1",
                "Location 1",
                "11:00",
                "David")))
                .thenReturn(new OpenSpaceSession(
                        1,
                        "Session 1",
                        "Location 1",
                        "11:00",
                        "David"));

        mockMvc.perform(post("/api/sessions")
                .content(asJsonString(new OpenSpaceSession(
                        1,
                        "Session 1",
                        "Location 1",
                        "11:00",
                        "David")))
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
}
