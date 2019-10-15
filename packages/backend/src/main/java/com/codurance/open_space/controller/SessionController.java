package com.codurance.open_space.controller;

import com.codurance.open_space.controller.rest.SessionRequestBody;
import com.codurance.open_space.domain.Session;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.domain.User;
import com.codurance.open_space.repository.SessionRepository;
import com.codurance.open_space.repository.SpaceRepository;
import com.codurance.open_space.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import javax.persistence.EntityNotFoundException;
import javax.persistence.ManyToOne;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionRepository repository;
    private final SpaceRepository spaceRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<Session> getAllOpenSpaceSessions() {
        return repository.findAll();
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
            return new ResponseEntity<>(repository.save(session), CREATED);
        } catch (DataIntegrityViolationException e) {

            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SessionRequestBody sessionRequestBody) {
        Session session = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        Space space = spaceRepository.findById(sessionRequestBody.getSpaceId()).get();
        session.setLocation(space);

        session.setPresenter(sessionRequestBody.getPresenter());
        session.setTime(sessionRequestBody.getTime());
        session.setTitle(sessionRequestBody.getTitle());
        session.setType(sessionRequestBody.getType());

        try {
            return new ResponseEntity<>(repository.save(session), OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ErrorResponse("Session type is required"), BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/like/{email}")
    public ResponseEntity<?> like(@PathVariable Long id, @PathVariable String email) {
        Session session = repository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        List<User> users = userRepository.findAll();
        boolean idExists = users.stream()
                .anyMatch(t -> t.getEmail().equals(email));
        if(!idExists) {
            //create the new user
        }


        Space space = spaceRepository.findById(sessionRequestBody.getSpaceId()).get();
        session.setLocation(space);

        session.setPresenter(sessionRequestBody.getPresenter());
        session.setTime(sessionRequestBody.getTime());
        session.setTitle(sessionRequestBody.getTitle());
        session.setType(sessionRequestBody.getType());

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
