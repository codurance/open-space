package com.codurance.open_space;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OpenSpaceSessionController.class)
public class OpenSpaceSessionControllerShould {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OpenSpaceSessionRepository repository;

    @Test
    void return_all_open_space_sessions_from_the_h2_db() throws Exception {
        when(repository.findAll()).thenReturn(
                List.of(new OpenSpaceSession(
                        1,
                        "Session 1",
                        "Location 1",
                        "11:00",
                        "David")));

        mockMvc.perform(get("/sessions")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{\"id\":1,\"title\":\"Session 1\",\"location\":\"Location 1\",\"time\":\"11:00\",\"presenter\":\"David\"}]"));
    }
}
