package ru.denis.shop.payload.response;

import ru.denis.shop.models.ImageData;

public class ImageUploadResponse {
    public Long id;
    public String name;
    public String type;

    public ImageUploadResponse(ImageData imageData) {
        this.id = imageData.getId();
        this.name = imageData.getName();
        this.type = imageData.getType();
    }
}
