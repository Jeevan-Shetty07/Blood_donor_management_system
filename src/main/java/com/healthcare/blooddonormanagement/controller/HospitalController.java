package com.healthcare.blooddonormanagement.controller;

import com.healthcare.blooddonormanagement.model.Hospital;
import com.healthcare.blooddonormanagement.service.HospitalService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @PostMapping("/add")
    public ResponseEntity<Hospital> add(@Valid @RequestBody Hospital hospital) {
        return ResponseEntity.ok(hospitalService.addHospital(hospital));
    }

    @GetMapping
    public ResponseEntity<List<Hospital>> getAll() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }
}
