package com.mycompany.dienthoaishop.service;

import com.mycompany.dienthoaishop.dto.SignInRequest;
import com.mycompany.dienthoaishop.dto.SignUpRequest;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.repository.UserRepository;
import com.mycompany.dienthoaishop.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;


    public User signUp(SignUpRequest signUpRequest) {
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setFullName(signUpRequest.getFullName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole("ROLE_USER"); // Default role
        return userRepository.save(user);
    }

    public String signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );
        var user = userRepository.findByUsername(signInRequest.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        return jwtService.generateToken(user.getUsername(), user.getRole());
    }
}