package com.mycompany.dienthoaishop.repository;

import com.mycompany.dienthoaishop.model.Order;
import com.mycompany.dienthoaishop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = 'COMPLETED'")
    BigDecimal findTotalRevenue();

    long countByOrderDateAfter(LocalDateTime date);
}
