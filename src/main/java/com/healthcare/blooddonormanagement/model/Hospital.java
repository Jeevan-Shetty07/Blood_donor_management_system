package com.healthcare.blooddonormanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "hospitals")
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

    public Hospital() {}

    public Hospital(Long id, String name, String location, String contactNumber) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contactNumber = contactNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
}
