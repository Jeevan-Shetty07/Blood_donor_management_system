package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.BloodRequest;
import com.healthcare.blooddonormanagement.service.BloodRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    public BloodRequestController(BloodRequestService bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }

    @PostMapping("/create")
    public ResponseEntity<BloodRequest> create(@Valid @RequestBody BloodRequest request) {
        return ResponseEntity.ok(bloodRequestService.createRequest(request));
    }

    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAll() {
        return ResponseEntity.ok(bloodRequestService.getAllRequests());
    }

    @GetMapping("/status")
    public ResponseEntity<List<BloodRequest>> getByStatus(@RequestParam String status) {
        return ResponseEntity.ok(bloodRequestService.getRequestsByStatus(status));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BloodRequest> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bloodRequestService.updateStatus(id, status));
    }
}
