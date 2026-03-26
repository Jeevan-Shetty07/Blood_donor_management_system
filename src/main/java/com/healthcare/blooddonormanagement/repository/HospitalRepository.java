package com.healthcare.blooddonormanagement.repository;

import com.healthcare.blooddonormanagement.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}
