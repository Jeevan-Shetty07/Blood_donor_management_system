package com.healthcare.blooddonormanagement.service;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import com.healthcare.blooddonormanagement.repository.BloodRequestRepository;
import com.healthcare.blooddonormanagement.repository.DonorRepository;
import com.healthcare.blooddonormanagement.repository.HospitalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;
    private final HospitalRepository hospitalRepository;
    private final DonorRepository donorRepository;

    public BloodRequestService(BloodRequestRepository bloodRequestRepository, 
                               HospitalRepository hospitalRepository,
                               DonorRepository donorRepository) {
        this.bloodRequestRepository = bloodRequestRepository;
        this.hospitalRepository = hospitalRepository;
        this.donorRepository = donorRepository;
    }

    public BloodRequest createRequest(BloodRequest request) {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            hospitalRepository.findByEmail(auth.getName()).ifPresent(h -> {
                request.setHospitalId(h.getId());
                request.setHospitalName(h.getName());
            });
        }
        return bloodRequestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return bloodRequestRepository.findAll();

        // If Donor, filter by matching blood type
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER"))) {
            return donorRepository.findByEmail(auth.getName())
                    .map(donor -> bloodRequestRepository.findByBloodGroupNeeded(donor.getBloodGroup()))
                    .orElseGet(bloodRequestRepository::findAll);
        }

        // If Hospital, filter by OWN requests only
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_HOSPITAL"))) {
            return hospitalRepository.findByEmail(auth.getName())
                    .map(h -> bloodRequestRepository.findByHospitalId(h.getId()))
                    .orElseGet(java.util.ArrayList::new);
        }

        return bloodRequestRepository.findAll();
    }

    public List<BloodRequest> getRequestsByStatus(String status) {
        return bloodRequestRepository.findByStatus(status);
    }

    public BloodRequest updateStatus(Long requestId, String status) {
        BloodRequest request = bloodRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return bloodRequestRepository.save(request);
    }
}
