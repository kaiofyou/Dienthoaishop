package com.mycompany.dienthoaishop.controller;

import com.mycompany.dienthoaishop.model.WishlistItem;
import com.mycompany.dienthoaishop.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    // API để lấy danh sách yêu thích của người dùng
    @GetMapping
    public ResponseEntity<List<WishlistItem>> getWishlist() {
        return ResponseEntity.ok(wishlistService.getWishlist());
    }

    // API để thêm một sản phẩm vào danh sách yêu thích
    @PostMapping
    public ResponseEntity<?> addToWishlist(@RequestBody Map<String, Long> payload) {
        try {
            Long productId = payload.get("productId");
            WishlistItem newItem = wishlistService.addToWishlist(productId);
            return ResponseEntity.ok(newItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API để xóa một sản phẩm khỏi danh sách yêu thích
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long productId) {
        try {
            wishlistService.removeFromWishlist(productId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
