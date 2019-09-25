package com.codurance.open_space;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class OpenSpaceSessionController {

    private final OpenSpaceSessionRepository repository;

    @GetMapping
    public List<OpenSpaceSession> getAllOpenSpaceSessions() {
        return repository.findAll();
    }

    @ResponseStatus(CREATED)
    @CrossOrigin
    @PostMapping
    public OpenSpaceSession create(@RequestBody OpenSpaceSession openSpaceSession) {
        return repository.save(openSpaceSession);
    }

    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id){
        repository.deleteById(id);
    }
}
