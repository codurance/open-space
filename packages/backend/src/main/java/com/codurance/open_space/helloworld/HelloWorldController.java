package com.codurance.open_space.helloworld;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping(value = "api", produces = MediaType.APPLICATION_JSON_VALUE)
    public HelloWorld getHelloWorld() {
        return new HelloWorld(1, "Hello, world!");
    }
}
