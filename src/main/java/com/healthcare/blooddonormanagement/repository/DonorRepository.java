package com.healthcare.blooddonormanagement.repository;

import com.healthcare.blooddonormanagement.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
    List<Donor> findByBloodGroup(String bloodGroup);

    boolean existsByEmail(String email);

    Optional<Donor> findByEmail(String email);
}
