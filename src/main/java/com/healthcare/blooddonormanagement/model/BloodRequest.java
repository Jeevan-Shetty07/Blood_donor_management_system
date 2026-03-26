package com.healthcare.blooddonormanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "blood_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long hospitalId;

    @NotBlank(message = "Blood group is mandatory")
    private String bloodGroupNeeded;

    @NotBlank(message = "Urgency level is mandatory (e.g., HIGH, MEDIUM, LOW)")
    private String urgency;

    private String status = "PENDING"; // PENDING, FULFILLED, CANCELLED

    private String notes;
}
