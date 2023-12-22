package com.kh.wob.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceDto {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
}
