package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.Donor;
import com.healthcare.blooddonormanagement.service.DonorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DonorController {

    private final DonorService donorService;

    @PostMapping
    public ResponseEntity<Donor> registerDonor(@Valid @RequestBody Donor donor) {
        return ResponseEntity.ok(donorService.registerDonor(donor));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Donor>> searchByBloodGroup(@RequestParam String bloodGroup) {
        return ResponseEntity.ok(donorService.searchByBloodGroup(bloodGroup));
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        return ResponseEntity.ok(donorService.getAllDonors());
    }
}
