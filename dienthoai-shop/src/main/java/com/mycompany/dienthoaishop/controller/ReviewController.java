package com.mycompany.dienthoaishop.controller;

import com.mycompany.dienthoaishop.dto.ReviewRequestDTO;
import com.mycompany.dienthoaishop.model.Review;
import com.mycompany.dienthoaishop.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // API để lấy tất cả đánh giá của một sản phẩm (công khai)
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsForProduct(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsForProduct(productId);
        return ResponseEntity.ok(reviews);
    }

    // API để thêm một bài đánh giá mới (yêu cầu đăng nhập)
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequestDTO reviewRequest) {
        try {
            Review newReview = reviewService.addReview(reviewRequest);
            return ResponseEntity.ok(newReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
