package com.codurance.open_space.controller;

import com.codurance.open_space.domain.Session;
import com.codurance.open_space.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionRepository repository;

    @GetMapping
    public List<Session> getAllOpenSpaceSessions() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Session session) {
        try {
            return new ResponseEntity<>(repository.save(session), CREATED);
        } catch (DataIntegrityViolationException e) {

            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Session openSpaceSession) {
        Session session = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        session.setLocation(openSpaceSession.getLocation());
        session.setPresenter(openSpaceSession.getPresenter());
        session.setTime(openSpaceSession.getTime());
        session.setTitle(openSpaceSession.getTitle());
        session.setType(openSpaceSession.getType());
        try {
            return new ResponseEntity<>(repository.save(session), OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
