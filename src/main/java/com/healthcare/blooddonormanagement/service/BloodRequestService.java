package com.healthcare.blooddonormanagement.service;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import com.healthcare.blooddonormanagement.repository.BloodRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;

    public BloodRequestService(BloodRequestRepository bloodRequestRepository) {
        this.bloodRequestRepository = bloodRequestRepository;
    }

    public BloodRequest createRequest(BloodRequest request) {
        return bloodRequestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
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
