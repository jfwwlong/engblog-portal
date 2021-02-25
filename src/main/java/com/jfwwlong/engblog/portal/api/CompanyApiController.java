package com.jfwwlong.engblog.portal.api;

import com.jfwwlong.engblog.portal.model.Company;
import com.jfwwlong.engblog.portal.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class CompanyApiController {

    private final CompanyService companyService;

    @Autowired
    public CompanyApiController(final CompanyService companyService) {
        this.companyService = companyService;
    }

    @RequestMapping("/companies")
    List<Company> getAllCompanyNames() {
        return companyService.getAllCompanies();
    }
}
