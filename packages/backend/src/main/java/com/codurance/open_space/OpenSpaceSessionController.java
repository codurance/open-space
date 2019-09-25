package com.codurance.open_space;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

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

    @PutMapping("/{id}")
    public OpenSpaceSession update(@PathVariable int id, @RequestBody OpenSpaceSession openSpaceSession) {
        OpenSpaceSession session = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        session.setLocation(openSpaceSession.getLocation());
        session.setPresenter(openSpaceSession.getPresenter());
        session.setTime(openSpaceSession.getTime());
        session.setTitle(openSpaceSession.getTitle());
        return repository.save(session);
    }

    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable int id){
        repository.deleteById(id);
    }
}
