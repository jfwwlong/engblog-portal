package com.jfwwlong.engblog.portal.service;

import com.jfwwlong.engblog.portal.dao.CompanyDao;
import com.jfwwlong.engblog.portal.model.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyDao companyDao;

    @Autowired
    public CompanyService(final CompanyDao companyDao) {
        this.companyDao = companyDao;
    }

    public List<Company> getAllCompanies() {
        return companyDao.findAll();
    }
}
