package com.healthcare.blooddonormanagement.repository;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByHospitalId(Long hospitalId);

    List<BloodRequest> findByBloodGroupNeeded(String bloodGroup);

    List<BloodRequest> findByStatus(String status);
}
