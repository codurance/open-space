package com.codurance.open_space.controller.rest;

import lombok.Data;

@Data
public
class SessionRequestBody{
    private String title;
    private Long spaceId;
    private String time;
    private String presenter;
    private String type;
}