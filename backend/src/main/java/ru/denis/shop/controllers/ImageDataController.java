package ru.denis.shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.denis.shop.models.ImageData;
import ru.denis.shop.payload.response.ImageUploadResponse;
import ru.denis.shop.services.ImageDataService;
import ru.denis.shop.util.FileUploadUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ImageDataController {

    private final ImageDataService imageDataService;
    private final ResourceLoader resourceLoader;
//    @Value("${upload.path}")
//    private String uploadPath;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            // Обработка ошибки, если файл отсутствует
            // Возвращайте ResponseEntity с соответствующим статусом и сообщением об ошибке
        }

//        File uploadDir = new File(uploadPath);
//        if (!uploadDir.exists()) {
//            if (!uploadDir.mkdirs()) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при создании каталога загрузки.");
//            }
//        }

        try {
            // Сгенерируйте уникальное имя файла или используйте оригинальное имя
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String fileDirectory = new ClassPathResource("classpath:static/image/").getFile().getAbsolutePath();
            Path filePath = Paths.get(fileDirectory+File.separator+UUID.randomUUID()+"_"+file.getOriginalFilename());

            Files.copy(file.getInputStream(), filePath);
            ImageUploadResponse response = imageDataService.uploadImage(file);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (IOException e) {
            // Верните ошибку, если что-то пошло не так
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при загрузке изображения.");
        }
    }

    @GetMapping("/info/{name}")
    public ResponseEntity<?>  getImageInfoByName(@PathVariable("name") String name){
        ImageData image = imageDataService.getInfoByImageByName(name);

        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @GetMapping("/{name}")
    public ResponseEntity<?>  getImageByName(@PathVariable("name") String name){
        byte[] image = imageDataService.getImage(name);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @Autowired
    public ImageDataController(ImageDataService imageDataService, ResourceLoader resourceLoader) {
        this.imageDataService = imageDataService;
        this.resourceLoader = resourceLoader;
    }
}
