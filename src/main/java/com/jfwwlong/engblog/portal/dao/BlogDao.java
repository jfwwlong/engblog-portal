package com.jfwwlong.engblog.portal.dao;

import com.jfwwlong.engblog.portal.model.Blog;
import com.jfwwlong.engblog.portal.model.Filters;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import javax.annotation.Nullable;
import java.time.LocalDate;
import java.util.List;

@Repository
public class BlogDao {
    private static final String FIELD_PUB_DATE = "pub_date";

    private final MongoTemplate mongoTemplate;

    @Autowired
    public BlogDao(final MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public LocalDate getDateById(final String id) {
        final Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(new ObjectId(id)));

        final Blog blog = mongoTemplate.findOne(query, Blog.class);
        return blog == null ? null : LocalDate.parse(blog.getPubDate());
    }

    /**
     * Find the next batch of blogs with given blog publish date and id by:
     * 1. Find blogs that have the same publish date and ID larger than the given ID
     * 2. Find blogs whose publish date less than the given publish date
     * 3. Return the result within the limit
     *
     * @param pubDate blog publish date
     * @param id      blog ID
     * @param limit   number of blogs to return
     * @return the next batch of blogs
     */
    public List<Blog> findNextBatchByPubDateAndId(
            @Nullable final LocalDate pubDate,
            @Nullable final String id,
            final Filters filters,
            final int limit
    ) {
        final Query query = new Query();
        Criteria criteria = new Criteria();
        if (id != null && pubDate != null) {
            criteria = new Criteria().orOperator(
                    Criteria.where("_id").gt(new ObjectId(id)).and(FIELD_PUB_DATE).is(pubDate.toString()),
                    Criteria.where(FIELD_PUB_DATE).lt(pubDate.toString())
            );
        }
        if (filters.getCompanies() != null && !filters.getCompanies().isEmpty()) {
            criteria = criteria.andOperator(Criteria.where("company").in(filters.getCompanies()));
        }

        query.addCriteria(criteria);
        query.with(Sort.by(Sort.Direction.DESC, "pub_date").and(Sort.by(Sort.Direction.ASC, "id")));
        query.limit(limit);
        return mongoTemplate.find(query, Blog.class);
    }
}
