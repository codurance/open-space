package com.codurance.open_space.controller;

import com.codurance.open_space.controller.rest.SessionRequestBody;
import com.codurance.open_space.domain.Session;
import com.codurance.open_space.domain.Space;
import com.codurance.open_space.repository.SessionRepository;
import com.codurance.open_space.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionRepository sessionRepository;
    private final SpaceRepository spaceRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    void sendEmail(Session session) {
        SimpleMailMessage msg = new SimpleMailMessage();
        String[] mailList = new String[session.getLikes().size()];
        int i = 0;
        for (String mail: session.getLikes()){
            mailList[i++] = mail;
        }
        msg.setTo(mailList);

        msg.setSubject("Updates on session " + session.getTitle());

        msg.setText("+----------------------------------------\n"
                +"+ Title: "+session.getTitle() +"\n"
                +"+++++++++++++++++++++++++++++++++++++++++\n"
                +"+ Location:" + session.getLocation().getName() +"\n"
                +"+ Presenter: " + session.getPresenter() +"\n"
                +"+ Time: " + session.getTime() +"\n"
                +"+ Type:" + session.getType() +"\n"
                +"+----------------------------------------");

        javaMailSender.send(msg);
    }

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

        CompletableFuture.runAsync(() -> sendEmail(session));

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
