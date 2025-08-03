package com.mycompany.dienthoaishop.controller;

import com.mycompany.dienthoaishop.dto.ChangePasswordRequestDTO;
import com.mycompany.dienthoaishop.dto.UserProfileUpdateDTO;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequestDTO request) {
        try {
            userService.changePassword(request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- ENDPOINT MỚI: LẤY THÔNG TIN HỒ SƠ ---
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile() {
        try {
            User user = userService.getCurrentUserProfile();
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // --- ENDPOINT MỚI: CẬP NHẬT HỒ SƠ ---
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileUpdateDTO profileUpdateDTO) {
        try {
            userService.updateUserProfile(profileUpdateDTO);
            return ResponseEntity.ok("Profile updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
