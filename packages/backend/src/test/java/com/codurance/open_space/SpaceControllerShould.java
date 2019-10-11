package com.codurance.open_space;

import com.codurance.helpers.TestUtils;
import com.codurance.open_space.controller.SpaceController;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SpaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SpaceController.class)
public class SpaceControllerShould {
    private Space space;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SpaceRepository spaceRepository;

    @BeforeEach
    void setUp() {
        space = new Space(1L, "Space1", "Biggest Room", "rooftop", "tv, projector");
    }

    @Test
    void return_list_of_spaces() throws Exception {
        when(spaceRepository.findAll()).thenReturn(List.of(space));

        String expectedJson = "[{\"id\":1,\"name\":\"Space1\",\"description\":\"Biggest Room\",\"location\":\"rooftop\",\"facilities\":\"tv, projector\"}]";
        mockMvc.perform(get("/api/spaces")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));
    }

    @Test
    void post_space() throws Exception {
        when(spaceRepository.save(space)).thenReturn(space);

        mockMvc.perform(post("/api/spaces")
                .content(TestUtils.asJsonString(space))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Space1"))
                .andExpect(jsonPath("$.description").value("Biggest Room"))
                .andExpect(jsonPath("$.location").value("rooftop"))
                .andExpect(jsonPath("$.facilities").value("tv, projector"));
    }

    @Test
    void update_facilities() throws Exception {
        final Optional<Space> space = Optional.of(this.space);
        when(spaceRepository.findById(1L))
                .thenReturn(space);

        Space spaceToUpdate = space.get();

        System.out.println(spaceToUpdate);
        System.out.println(this.space);

        spaceToUpdate.setFacilities("TV, Bedroom");

        when(spaceRepository.save(spaceToUpdate))
                .thenReturn(spaceToUpdate);

        mockMvc.perform(put("/api/spaces/1")
                .content(TestUtils.asJsonString(spaceToUpdate))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(spaceRepository).findById(1L);
        verify(spaceRepository).save(spaceToUpdate);
    }
}
