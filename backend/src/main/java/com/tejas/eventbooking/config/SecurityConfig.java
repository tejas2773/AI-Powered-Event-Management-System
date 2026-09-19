//package com.tejas.eventbooking.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.tejas.eventbooking.security.JwtAuthFilter;
//
//@Configuration
//public class SecurityConfig {
//
//    @Autowired
//    private JwtAuthFilter jwtAuthFilter;
//
//    
//    @Bean
//    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
//        org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
//        config.setAllowedOrigins(java.util.List.of("http://localhost:3000", "http://localhost:5173"));
//        config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(java.util.List.of("*"));
//        config.setAllowCredentials(true);
//
//        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
//                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//        	.cors(cors -> cors.configurationSource(corsConfigurationSource()))
//            .csrf(AbstractHttpConfigurer::disable)
//            .sessionManagement(session -> session
//                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .authorizeHttpRequests(auth -> auth
//                    .requestMatchers("/api/auth/**").permitAll()
//                    .requestMatchers("/api/users/**").permitAll()
//                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/events/**").permitAll()
//                    .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/events").hasRole("ORGANIZER")
//                    .requestMatchers("/api/bookings/**").authenticated()
//                    .anyRequest().authenticated()
//            )
//            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//}



package com.tejas.eventbooking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tejas.eventbooking.security.JwtAuthFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;
    @org.springframework.beans.factory.annotation.Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
        config.setAllowedOrigins(java.util.List.of("http://localhost:3000", "http://localhost:5173",frontendUrl));
        config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(java.util.List.of("*"));
        config.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        	.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/users/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/events/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/events").hasRole("ORGANIZER")
                    .requestMatchers("/api/bookings/**").authenticated()
                    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}