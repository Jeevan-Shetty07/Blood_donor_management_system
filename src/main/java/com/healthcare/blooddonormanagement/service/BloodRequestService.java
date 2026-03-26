package com.healthcare.blooddonormanagement.service;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import com.healthcare.blooddonormanagement.repository.BloodRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;

    public BloodRequest createRequest(BloodRequest request) {
        return bloodRequestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    public List<BloodRequest> getRequestsByHospital(Long hospitalId) {
        return bloodRequestRepository.findByHospitalId(hospitalId);
    }

    public BloodRequest updateStatus(Long requestId, String status) {
        BloodRequest request = bloodRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return bloodRequestRepository.save(request);
    }
}
