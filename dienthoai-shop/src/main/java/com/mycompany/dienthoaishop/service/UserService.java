package com.mycompany.dienthoaishop.service;

import com.mycompany.dienthoaishop.dto.UserProfileUpdateDTO;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getAuthenticatedUser() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void changePassword(String oldPassword, String newPassword) {
        User user = getAuthenticatedUser();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect old password");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // --- HÀM MỚI: LẤY THÔNG TIN HỒ SƠ ---
    public User getCurrentUserProfile() {
        return getAuthenticatedUser();
    }

    // --- HÀM MỚI: CẬP NHẬT HỒ SƠ ---
    public User updateUserProfile(UserProfileUpdateDTO profileUpdateDTO) {
        User user = getAuthenticatedUser();
        user.setFullName(profileUpdateDTO.getFullName());
        user.setPhoneNumber(profileUpdateDTO.getPhoneNumber());
        user.setAddress(profileUpdateDTO.getAddress());
        return userRepository.save(user);
    }
}
