package com.mycompany.dienthoaishop.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
}