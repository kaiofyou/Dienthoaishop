package com.mycompany.dienthoaishop.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    // --- BẠN CẦN THÊM TRƯỜNG NÀY ---
    private String address;
    // --------------------------------

    private String role; // Ví dụ: "ROLE_USER", "ROLE_ADMIN"
}