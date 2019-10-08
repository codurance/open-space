package com.codurance.open_space.controller.rest;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Data
@RequiredArgsConstructor
@NoArgsConstructor(access = PRIVATE, force = true)
public class Facilities {
    private final String facilities;
}
