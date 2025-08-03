package com.mycompany.dienthoaishop.service;

import com.mycompany.dienthoaishop.dto.ReviewRequestDTO;
import com.mycompany.dienthoaishop.model.Product;
import com.mycompany.dienthoaishop.model.Review;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.repository.ProductRepository;
import com.mycompany.dienthoaishop.repository.ReviewRepository;
import com.mycompany.dienthoaishop.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Lấy tất cả đánh giá của một sản phẩm
    public List<Review> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    // Thêm một đánh giá mới
    public Review addReview(ReviewRequestDTO reviewRequest) {
        // Lấy thông tin người dùng đang đăng nhập
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Tìm sản phẩm được đánh giá
        Product product = productRepository.findById(reviewRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review newReview = new Review();
        newReview.setUser(user);
        newReview.setProduct(product);
        newReview.setRating(reviewRequest.getRating());
        newReview.setComment(reviewRequest.getComment());

        return reviewRepository.save(newReview);
    }
}
