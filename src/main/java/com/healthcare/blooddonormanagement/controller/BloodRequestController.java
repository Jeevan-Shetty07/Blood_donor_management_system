package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import com.healthcare.blooddonormanagement.service.BloodRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    @PostMapping
    public ResponseEntity<BloodRequest> createRequest(@Valid @RequestBody BloodRequest request) {
        return ResponseEntity.ok(bloodRequestService.createRequest(request));
    }

    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(bloodRequestService.getAllRequests());
    }

    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<BloodRequest>> getRequestsByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(bloodRequestService.getRequestsByHospital(hospitalId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<BloodRequest> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bloodRequestService.updateStatus(id, status));
    }
}
