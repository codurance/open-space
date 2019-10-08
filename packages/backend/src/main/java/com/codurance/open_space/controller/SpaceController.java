package com.codurance.open_space.controller;

import com.codurance.open_space.controller.rest.Facilities;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/spaces")
public class SpaceController {

    private final SpaceRepository spaceRepository;

    @GetMapping
    public List<Space> getAllSpaces() {
        return spaceRepository.findAll();
    }

    @ResponseStatus(CREATED)
    @CrossOrigin
    @PostMapping
    public Space create(@RequestBody Space space) {
        return spaceRepository.save(space);
    }

    @PutMapping("/{id}/facilities")
    public void update(@PathVariable Long id, @RequestBody Facilities facilities) {
        Space spaceEntity = spaceRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        spaceEntity.setFacilities(facilities.getFacilities());
        spaceRepository.save(spaceEntity);
    }

}
