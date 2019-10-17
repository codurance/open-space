package com.codurance.open_space.controller;

import com.codurance.open_space.controller.rest.SessionRequestBody;
import com.codurance.open_space.domain.Session;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SessionRepository;
import com.codurance.open_space.repository.SpaceRepository;
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

    private final SessionRepository sessionRepository;
    private final SpaceRepository spaceRepository;

    @GetMapping
    public List<Session> getAllOpenSpaceSessions() {
        return sessionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody SessionRequestBody sessionRequestBody) {
        Space space = spaceRepository.findById(sessionRequestBody.getSpaceId()).get();
        Session session = new Session();
        session.setTitle(sessionRequestBody.getTitle());
        session.setLocation(space);
        session.setPresenter(sessionRequestBody.getPresenter());
        session.setTime(sessionRequestBody.getTime());
        session.setType(sessionRequestBody.getType());
        try {
            return new ResponseEntity<>(sessionRepository.save(session), CREATED);
        } catch (DataIntegrityViolationException e) {

            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SessionRequestBody sessionRequestBody) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        Space space = spaceRepository.findById(sessionRequestBody.getSpaceId()).get();
        session.setLocation(space);

        session.setPresenter(sessionRequestBody.getPresenter());
        session.setTime(sessionRequestBody.getTime());
        session.setTitle(sessionRequestBody.getTitle());
        session.setType(sessionRequestBody.getType());

        try {
            return new ResponseEntity<>(sessionRepository.save(session), OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/likes/{email}")
    public void updateLike(@PathVariable Long id, @PathVariable String email) {
        Session session = sessionRepository.findById(id).get();

        if (session.getLikes().contains(email)) session.getLikes().remove(email);
        else session.getLikes().add(email);

        sessionRepository.save(session);
    }
    @ResponseStatus(NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        sessionRepository.deleteById(id);
    }
}
