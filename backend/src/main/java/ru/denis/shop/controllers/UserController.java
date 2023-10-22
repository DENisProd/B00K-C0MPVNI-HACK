package ru.denis.shop.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.denis.shop.payload.response.UserProfileResponse;
import ru.denis.shop.services.UserDetailsImpl;
import ru.denis.shop.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile/")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public UserProfileResponse getUserProfile() {
        UserDetailsImpl userImp = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getUserProfile(userImp.getId());
    }
}
