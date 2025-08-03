package com.mycompany.dienthoaishop.repository;

import com.mycompany.dienthoaishop.model.Product;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    // Tìm tất cả các mục trong danh sách yêu thích của một người dùng
    List<WishlistItem> findByUser(User user);

    // Kiểm tra xem một sản phẩm đã tồn tại trong danh sách yêu thích của người dùng chưa
    boolean existsByUserAndProduct(User user, Product product);

    // Xóa một mục khỏi danh sách yêu thích dựa trên người dùng và sản phẩm
    void deleteByUserAndProduct(User user, Product product);
}
