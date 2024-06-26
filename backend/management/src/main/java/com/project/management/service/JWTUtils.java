package com.project.management.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

/**
 * Utility class for JWT operations including token generation, validation, and extraction.
 */

@Component
public class JWTUtils {
    
    private SecretKey Key;
    private static final long EXPIRATION_TIME = 86400000; // 24 hours in milliseconds

    /**
     * Constructs a JWTUtils instance with a predefined secret key for token signing.
     */
    public JWTUtils(){
        // Hardcoded secret key for signing JWTs (Note: Consider a more secure approach for production)
        String secretString = "843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3";
        byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    /**
     * Generates a JWT token for the provided UserDetails object.
     *
     * @param userDetails The UserDetails object containing user details.
     * @return JWT token as a String.
     */
    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    /**
     * Generates a refresh token with custom claims and expiration for the provided UserDetails object.
     *
     * @param claims Custom claims to be included in the refresh token.
     * @param userDetails The UserDetails object containing user details.
     * @return Refresh token as a String.
     */
    public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails){
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    } 

    /**
     * Extracts the username from the JWT token.
     *
     * @param token The JWT token from which to extract the username.
     * @return Username extracted from the token.
     */
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    /**
     * Extracts claims from the JWT token using the provided function.
     *
     * @param token The JWT token from which to extract claims.
     * @param claimsTFunction Function to extract specific claims from the token.
     * @param <T> Type of the claim to be extracted.
     * @return Extracted claim.
     */
    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }

    /**
     * Validates if the JWT token is not expired and matches the provided UserDetails.
     *
     * @param token The JWT token to be validated.
     * @param userDetails The UserDetails object representing the user.
     * @return True if the token is valid, false otherwise.
     */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Checks if the JWT token has expired.
     *
     * @param token The JWT token to be checked.
     * @return True if the token has expired, false otherwise.
     */
    private boolean isTokenExpired(String token){
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
