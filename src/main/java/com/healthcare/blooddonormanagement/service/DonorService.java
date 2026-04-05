package com.healthcare.blooddonormanagement.service;

import com.healthcare.blooddonormanagement.model.Donor;
import com.healthcare.blooddonormanagement.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    public Donor registerDonor(Donor donor) {
        if (donorRepository.existsByEmail(donor.getEmail())) {
            throw new RuntimeException("Donor with this email already exists");
        }
        return donorRepository.save(donor);
    }

    public List<Donor> searchByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
