package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.Donor;
import com.healthcare.blooddonormanagement.service.DonorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @PostMapping("/register")
    public ResponseEntity<Donor> register(@Valid @RequestBody Donor donor) {
        return ResponseEntity.ok(donorService.registerDonor(donor));
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_HOSPITAL')")
    public ResponseEntity<List<Donor>> getAll() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ROLE_HOSPITAL')")
    public ResponseEntity<List<Donor>> search(@RequestParam String bloodGroup) {
        return ResponseEntity.ok(donorService.searchByBloodGroup(bloodGroup));
    }
}
