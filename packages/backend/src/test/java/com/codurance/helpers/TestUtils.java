package com.codurance.helpers;

import com.fasterxml.jackson.databind.ObjectMapper;

public final class TestUtils {

    public static String asJsonString(final Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
