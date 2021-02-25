package com.jfwwlong.engblog.portal.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "companies")
public class Company {

    private final String company;
}
