package ru.denis.shop.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.shop.exceptions.InvitationNotFoundException;
import ru.denis.shop.models.Invitation;
import ru.denis.shop.repository.InvitationRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class InvitationService {
    private final InvitationRepository invitationRepository;

    public List<Invitation> getAllInvitations() {
        return invitationRepository.findAll();
    }

    public Optional<Invitation> getInvitationById(Long id) {
        return invitationRepository.findById(id);
    }

    public Invitation createInvitation(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    public Invitation updateInvitation(Long id, Invitation updatedInvitation) {
        if (invitationRepository.existsById(id)) {
            updatedInvitation.setId(id);
            return invitationRepository.save(updatedInvitation);
        } else {
            throw new InvitationNotFoundException("Invitation with ID " + id + " not found");
        }
    }

    public void deleteInvitation(Long id) {
        if (invitationRepository.existsById(id)) {
            invitationRepository.deleteById(id);
        } else {
            throw new InvitationNotFoundException("Invitation with ID " + id + " not found");
        }
    }
}
