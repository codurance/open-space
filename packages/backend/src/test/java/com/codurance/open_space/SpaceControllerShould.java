package com.codurance.open_space;

import com.codurance.open_space.controller.SpaceController;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SpaceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SpaceController.class)
public class SpaceControllerShould {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SpaceRepository spaceRepository;

    @Test
    void return_list_of_spaces() throws Exception {
        Space space = new Space(1L,"Space1","Biggest Room", "rooftop");
        when(spaceRepository.findAll()).thenReturn(List.of(space));

        String expectedJson = "[{\"id\":1,\"name\":\"Space1\",\"description\":\"Biggest Room\",\"location\":\"rooftop\"}]";
        mockMvc.perform(get("/api/spaces")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));
    }
}
