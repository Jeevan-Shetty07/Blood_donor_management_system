package com.healthcare.blooddonormanagement.repository;

import com.healthcare.blooddonormanagement.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
    List<Donor> findByBloodGroup(String bloodGroup);

    boolean existsByEmail(String email);
}
