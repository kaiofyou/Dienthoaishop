package com.mycompany.dienthoaishop.repository;

import com.mycompany.dienthoaishop.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Tìm tất cả các bài đánh giá cho một sản phẩm cụ thể
    List<Review> findByProductId(Long productId);
}
