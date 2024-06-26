package com.project.management.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.management.service.JWTUtils;
import com.project.management.service.UserDetailsAuthService;

import java.io.IOException;

/**
 * Filter for handling JWT authentication and authorization.
 * This filter intercepts incoming requests, extracts JWT tokens,validates them, 
 * and sets up Spring Security authentication if the token is valid.
 */

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserDetailsAuthService userDetailsAuthService;

    /**
     * Method to perform JWT token validation and set up Spring Security context.
     *
     * @param request The HTTP servlet request.
     * @param response The HTTP servlet response.
     * @param filterChain The filter chain for invoking subsequent filters.
     * @throws ServletException If an error occurs during the servlet processing.
     * @throws IOException If an I/O error occurs during the servlet processing.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // Check if Authorization header is present and not empty
        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT token from Authorization header
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);

        // Check if there's no existing authentication in SecurityContext
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from database based on email extracted from token
            UserDetails userDetails = userDetailsAuthService.loadUserByUsername(userEmail);

            // Validate JWT token against loaded user details
            if (jwtUtils.isTokenValid(jwtToken, userDetails)) {
                // Create an empty SecurityContext and set authentication using JWT token
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);
            }
        }

        // Proceed to the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
