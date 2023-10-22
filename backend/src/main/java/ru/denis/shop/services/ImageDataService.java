package ru.denis.shop.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.denis.shop.models.ImageData;
import ru.denis.shop.payload.response.ImageUploadResponse;
import ru.denis.shop.repository.ImageDataRepository;
import ru.denis.shop.util.ImageUtil;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ImageDataService {

    private final ImageDataRepository imageDataRepository;

    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {

        ImageData savedImageData = imageDataRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes())).build());

        return new ImageUploadResponse(savedImageData);
    }

    @Transactional
    public ImageData getInfoByImageByName(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);

        return ImageData.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .imageData(ImageUtil.decompressImage(dbImage.get().getImageData())).build();

    }

    @Transactional
    public byte[] getImage(String name) {
        Optional<ImageData> dbImage = imageDataRepository.findByName(name);
        return ImageUtil.decompressImage(dbImage.get().getImageData());
    }
}
