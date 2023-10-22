package ru.denis.shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.denis.shop.exceptions.InvitationNotFoundException;
import ru.denis.shop.models.Invitation;
import ru.denis.shop.services.InvitationService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/invitations")
@AllArgsConstructor
public class InvitationController {
    private final InvitationService invitationService;

    @GetMapping
    public List<Invitation> getAllInvitations() {
        return invitationService.getAllInvitations();
    }

    @GetMapping("/{id}")
    public Invitation getInvitation(@PathVariable Long id) {
        return invitationService.getInvitationById(id)
                .orElseThrow(() -> new InvitationNotFoundException("Invitation with ID " + id + " not found"));
    }

    @PostMapping
    public Invitation createInvitation(@RequestBody Invitation invitation) {
        return invitationService.createInvitation(invitation);
    }

    @PutMapping("/{id}")
    public Invitation updateInvitation(@PathVariable Long id, @RequestBody Invitation updatedInvitation) {
        return invitationService.updateInvitation(id, updatedInvitation);
    }

    @DeleteMapping("/{id}")
    public void deleteInvitation(@PathVariable Long id) {
        invitationService.deleteInvitation(id);
    }
}

