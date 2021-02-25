package com.jfwwlong.engblog.portal.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class Filters {
    private final List<String> companies;
}
