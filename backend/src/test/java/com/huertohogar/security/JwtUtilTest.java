package com.huertohogar.security;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {
    private final JwtUtil jwtUtil = new JwtUtil();

    @Test
    void generateAndValidateToken() {
        String token = jwtUtil.generateToken("admin", "ADMIN");
        assertNotNull(token);
        assertTrue(jwtUtil.validateToken(token));
        assertEquals("admin", jwtUtil.extractUsername(token));
        assertEquals("ADMIN", jwtUtil.extractRole(token));
    }

    @Test
    void invalidTokenReturnsFalse() {
        assertFalse(jwtUtil.validateToken("invalid.token"));
    }
}
