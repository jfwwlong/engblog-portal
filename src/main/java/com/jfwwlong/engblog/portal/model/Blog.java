package com.jfwwlong.engblog.portal.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "blogs")
public class Blog {

    @Id
    private final String id;

    private final String title;

    private final String url;

    @Field("pub_date")
    private final String pubDate;

    private final String company;

    private final String cover;

    private final String companyIcon;
}
