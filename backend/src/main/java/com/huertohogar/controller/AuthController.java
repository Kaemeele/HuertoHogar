package com.huertohogar.controller;

import com.huertohogar.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtUtil jwtUtil;

    // Simple in‑memory users for demo (username -> [password, role])
    private static final Map<String, String[]> USERS = Map.of(
            "admin", new String[]{"admin123", "ADMIN"},
            "user", new String[]{"user123", "USER"}
    );

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing credentials"));
        }
        String[] data = USERS.get(username);
        if (data == null || !data[0].equals(password)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        String token = jwtUtil.generateToken(username, data[1]);
        return ResponseEntity.ok(Map.of("token", token, "role", data[1]));
    }
}
