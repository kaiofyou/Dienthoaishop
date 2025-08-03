package com.mycompany.dienthoaishop;

import com.mycompany.dienthoaishop.model.Category;
import com.mycompany.dienthoaishop.model.Product;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.repository.CategoryRepository;
import com.mycompany.dienthoaishop.repository.ProductRepository;
import com.mycompany.dienthoaishop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class DienthoaiShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(DienthoaiShopApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (productRepository.count() == 0) {
                System.out.println(">>> Seeding large dataset...");

                //--- Tạo User ---
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEmail("admin@shop.com");
                admin.setFullName("Administrator");
                admin.setRole("ROLE_ADMIN");

                User user = new User();
                user.setUsername("testuser");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setEmail("user@shop.com");
                user.setFullName("Test User");
                user.setRole("ROLE_USER");

                userRepository.saveAll(List.of(admin, user));

                //--- Tạo Category ---
                Category iphoneCategory = new Category(null, "iPhone");
                Category samsungCategory = new Category(null, "Samsung");
                Category xiaomiCategory = new Category(null, "Xiaomi");
                Category oppoCategory = new Category(null, "OPPO");
                Category googleCategory = new Category(null, "Google");
                categoryRepository.saveAll(List.of(iphoneCategory, samsungCategory, xiaomiCategory, oppoCategory, googleCategory));

                //--- Tạo sản phẩm ---
                List<Product> products = List.of(
                        // iPhones
                        new Product(null, "iPhone 15 Pro Max 256GB", "Chip A17 Pro, khung Titan.", new BigDecimal("32500000"), new BigDecimal("29500000"), null, "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg", 100, null, iphoneCategory),
                        new Product(null, "iPhone 15 Pro 128GB", "Màn hình Super Retina XDR 6.1 inch.", new BigDecimal("25290000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-blue-thumbnew-600x600.jpg", 120, null, iphoneCategory),
                        new Product(null, "iPhone 15 Plus 128GB", "Camera Chính 48MP, màn hình lớn 6.7 inch.", new BigDecimal("22490000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/299034/iphone-15-plus-blue-thumbnew-600x600.jpg", 150, null, iphoneCategory),
                        new Product(null, "iPhone 15 128GB", "Thiết kế mới với Dynamic Island, sạc USB-C.", new BigDecimal("19590000"), new BigDecimal("18990000"), null, "https://cdn.tgdd.vn/Products/Images/42/281573/iphone-15-blue-thumbnew-600x600.jpg", 200, null, iphoneCategory),
                        new Product(null, "iPhone 14 Pro Max 128GB", "Chip A16 Bionic mạnh mẽ, màn hình luôn bật.", new BigDecimal("27090000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-purple-thumb-600x600.jpg", 80, null, iphoneCategory),

                        // Samsungs
                        new Product(null, "Samsung Galaxy S24 Ultra 256GB", "Galaxy AI, Chip Snapdragon 8 Gen 3, bút S Pen.", new BigDecimal("33990000"), new BigDecimal("31990000"), null, "https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-thumb-600x600.jpg", 50, null, samsungCategory),
                        new Product(null, "Samsung Galaxy Z Fold5 256GB", "Màn hình gập, đa nhiệm như PC.", new BigDecimal("30990000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/285690/samsung-galaxy-z-fold5-kem-600x600.jpg", 40, null, samsungCategory),
                        new Product(null, "Samsung Galaxy Z Flip5 256GB", "Thiết kế gập nhỏ gọn, màn hình phụ Flex Window.", new BigDecimal("19990000"), new BigDecimal("18990000"), null, "https://cdn.tgdd.vn/Products/Images/42/283821/samsung-galaxy-z-flip5-xanh-mint-600x600.jpg", 60, null, samsungCategory),
                        new Product(null, "Samsung Galaxy S23 FE 128GB", "Camera 'Mắt thần bóng đêm', hiệu năng mạnh mẽ.", new BigDecimal("11890000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/307192/samsung-galaxy-s23-fe-xanh-thumb-600x600.jpg", 90, null, samsungCategory),
                        new Product(null, "Samsung Galaxy A55 5G 128GB", "Khung viền kim loại, camera 50MP.", new BigDecimal("9490000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/322096/samsung-galaxy-a55-xanh-thumb-600x600.jpg", 250, null, samsungCategory),

                        // Xiaomis
                        new Product(null, "Xiaomi 14 256GB", "Hợp tác với Leica, Chip Snapdragon 8 Gen 3.", new BigDecimal("22990000"), new BigDecimal("20990000"), null, "https://cdn.tgdd.vn/Products/Images/42/322208/xiaomi-14-green-thumb-600x600.jpg", 80, null, xiaomiCategory),
                        new Product(null, "Xiaomi 13T Pro 5G 512GB", "Sạc nhanh 120W, camera Leica chuyên nghiệp.", new BigDecimal("14990000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/309832/xiaomi-13t-pro-xanh-thumb-600x600.jpg", 70, null, xiaomiCategory),
                        new Product(null, "Xiaomi Redmi Note 13 Pro+ 5G", "Camera 200MP, màn hình cong AMOLED.", new BigDecimal("10490000"), new BigDecimal("9990000"), null, "https://cdn.tgdd.vn/Products/Images/42/319266/xiaomi-redmi-note-13-pro-plus-trang-thumb-600x600.jpg", 130, null, xiaomiCategory),
                        new Product(null, "Xiaomi Redmi Note 13 128GB", "Màn hình AMOLED 120Hz, camera 108MP.", new BigDecimal("4690000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/319265/xiaomi-redmi-note-13-xanh-thumb-600x600.jpg", 300, null, xiaomiCategory),
                        new Product(null, "Xiaomi POCO X6 Pro 5G", "Hiệu năng gaming vượt trội, sạc nhanh 67W.", new BigDecimal("9490000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/321532/xiaomi-poco-x6-pro-5g-xam-thumb-600x600.jpg", 110, null, xiaomiCategory),

                        // OPPO & Google
                        new Product(null, "OPPO Reno11 F 5G", "Thiết kế mỏng nhẹ, camera siêu nét.", new BigDecimal("8490000"), new BigDecimal("7990000"), null, "https://cdn.tgdd.vn/Products/Images/42/322521/oppo-reno11-f-5g-xanh-thumb-600x600.jpg", 140, null, oppoCategory),
                        new Product(null, "OPPO Find N3 Flip 5G", "Điện thoại gập, camera Hasselblad.", new BigDecimal("22990000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/309528/oppo-find-n3-flip-5g-gold-thumb-600x600.jpg", 30, null, oppoCategory),
                        new Product(null, "Google Pixel 8 Pro 128GB", "Trải nghiệm Android thuần khiết, camera AI.", new BigDecimal("25990000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/314227/google-pixel-8-pro-xanh-thumb-600x600.jpg", 25, null, googleCategory),
                        new Product(null, "Google Pixel 8 128GB", "Thiết kế nhỏ gọn, hiệu năng mạnh mẽ.", new BigDecimal("18990000"), new BigDecimal("17500000"), null, "https://cdn.tgdd.vn/Products/Images/42/314226/google-pixel-8-xam-thumb-600x600.jpg", 45, null, googleCategory),
                        new Product(null, "OPPO A58 128GB", "Pin trâu, sạc nhanh, màn hình lớn.", new BigDecimal("4990000"), null, null, "https://cdn.tgdd.vn/Products/Images/42/309722/oppo-a58-xanh-thumb-600x600.jpg", 280, null, oppoCategory)
                );

                productRepository.saveAll(products);

                System.out.println(">>> Seeding data finished.");
            }
        };
    }
}
