package com.jfwwlong.engblog.portal.service;

import com.google.common.base.Preconditions;
import com.jfwwlong.engblog.portal.dao.BlogDao;
import com.jfwwlong.engblog.portal.model.Blog;
import com.jfwwlong.engblog.portal.model.Filters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BlogService {

    private final BlogDao blogDao;

    @Autowired
    public BlogService(
            final BlogDao blogDao
    ) {
        this.blogDao = blogDao;
    }

    public List<Blog> getLatestBlogs(
            final Filters filters,
            final int limit
    ) {
        return blogDao.findNextBatchByPubDateAndId(null, null, filters, limit);
    }

    public List<Blog> getNextPage(
            final String id,
            final Filters filters,
            final int limit
    ) {
        Preconditions.checkNotNull(id, "Input id should be non null for pagination request");

        final LocalDate pubDate = blogDao.getDateById(id);
        Preconditions.checkNotNull(pubDate, "Cannot find publish date for blog: %s", id);

        return blogDao.findNextBatchByPubDateAndId(pubDate, id, filters, limit);
    }
}
