package com.healthcare.blooddonormanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Hospital name is mandatory")
    private String name;

    @NotBlank(message = "Location is mandatory")
    private String location;

    @NotBlank(message = "Contact number is mandatory")
    private String contactNumber;
}
