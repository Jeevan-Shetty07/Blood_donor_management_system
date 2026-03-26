package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.Hospital;
import com.healthcare.blooddonormanagement.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HospitalController {

    private final HospitalService hospitalService;

    @PostMapping
    public ResponseEntity<Hospital> registerHospital(@Valid @RequestBody Hospital hospital) {
        return ResponseEntity.ok(hospitalService.registerHospital(hospital));
    }

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }
}
