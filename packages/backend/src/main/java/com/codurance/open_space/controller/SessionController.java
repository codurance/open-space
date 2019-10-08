package com.codurance.open_space.controller;

import com.codurance.open_space.domain.Session;
import com.codurance.open_space.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionRepository repository;

    @GetMapping
    public List<Session> getAllOpenSpaceSessions() {
        return repository.findAll();
    }

    @ResponseStatus(CREATED)
    @CrossOrigin
    @PostMapping
    public Session create(@RequestBody Session session) {
        return repository.save(session);
    }

    @PutMapping("/{id}")
    public Session update(@PathVariable int id, @RequestBody Session openSpaceSession) {
        Session session = repository.findById(id)
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
