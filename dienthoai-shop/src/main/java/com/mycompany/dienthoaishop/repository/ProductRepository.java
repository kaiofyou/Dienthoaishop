package com.mycompany.dienthoaishop.repository;

import com.mycompany.dienthoaishop.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Tìm các sản phẩm có tên chứa chuỗi 'keyword', không phân biệt hoa thường
    List<Product> findByNameContainingIgnoreCase(String keyword);
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}