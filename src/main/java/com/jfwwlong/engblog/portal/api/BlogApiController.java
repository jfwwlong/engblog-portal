package com.jfwwlong.engblog.portal.api;

import com.jfwwlong.engblog.portal.model.Blog;
import com.jfwwlong.engblog.portal.model.Filters;
import com.jfwwlong.engblog.portal.service.BlogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class BlogApiController {
    private static final int PAGE_SIZE = 30;

    private final BlogService blogService;

    @Autowired
    public BlogApiController(final BlogService blogService) {
        this.blogService = blogService;
    }

    @RequestMapping("/blogs")
    List<Blog> blogs(
            @RequestParam(required = false) final List<String> companies,
            @RequestParam(required = false) final String startId
    ) {
        final Filters.FiltersBuilder filtersBuilder = Filters.builder();
        if (companies != null && !companies.isEmpty()) {
            filtersBuilder.companies(companies);
        }

        final Filters filters = filtersBuilder.build();
        if (startId == null) {
            return blogService.getLatestBlogs(filters, PAGE_SIZE);
        }

        return blogService.getNextPage(startId, filters, PAGE_SIZE);
    }
}
