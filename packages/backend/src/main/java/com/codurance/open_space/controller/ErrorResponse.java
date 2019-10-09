package com.codurance.open_space.controller;

class ErrorResponse {
    private String message;

    ErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
