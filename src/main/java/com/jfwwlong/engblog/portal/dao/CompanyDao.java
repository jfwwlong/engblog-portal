package com.jfwwlong.engblog.portal.dao;

import com.jfwwlong.engblog.portal.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyDao extends MongoRepository<Company, String> {
}
