package com.mycompany.dienthoaishop.service;

import com.mycompany.dienthoaishop.model.Product;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.model.WishlistItem;
import com.mycompany.dienthoaishop.repository.ProductRepository;
import com.mycompany.dienthoaishop.repository.UserRepository;
import com.mycompany.dienthoaishop.repository.WishlistItemRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistItemRepository wishlistItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private User getAuthenticatedUser() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Lấy danh sách yêu thích của người dùng hiện tại
    @Transactional(readOnly = true)
    public List<WishlistItem> getWishlist() {
        User user = getAuthenticatedUser();
        return wishlistItemRepository.findByUser(user);
    }

    // Thêm một sản phẩm vào danh sách yêu thích
    public WishlistItem addToWishlist(Long productId) {
        User user = getAuthenticatedUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Kiểm tra để tránh thêm trùng lặp
        if (wishlistItemRepository.existsByUserAndProduct(user, product)) {
            throw new RuntimeException("Product already in wishlist");
        }

        WishlistItem wishlistItem = new WishlistItem(null, user, product);
        return wishlistItemRepository.save(wishlistItem);
    }

    // Xóa một sản phẩm khỏi danh sách yêu thích
    @Transactional
    public void removeFromWishlist(Long productId) {
        User user = getAuthenticatedUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        wishlistItemRepository.deleteByUserAndProduct(user, product);
    }
}
