    package com.mycompany.dienthoaishop.service;

    import com.mycompany.dienthoaishop.dto.DashboardStatsDTO;
    import com.mycompany.dienthoaishop.repository.OrderRepository;
    import com.mycompany.dienthoaishop.repository.ProductRepository;
    import com.mycompany.dienthoaishop.repository.UserRepository;
    import org.springframework.stereotype.Service;

    import java.math.BigDecimal;
    import java.time.LocalDate;
    import java.time.LocalTime;

    @Service
    public class DashboardService {

        private final OrderRepository orderRepository;
        private final ProductRepository productRepository;
        private final UserRepository userRepository;

        public DashboardService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
            this.orderRepository = orderRepository;
            this.productRepository = productRepository;
            this.userRepository = userRepository;
        }

        public DashboardStatsDTO getDashboardStats() {
            BigDecimal totalRevenue = orderRepository.findTotalRevenue();
            if (totalRevenue == null) {
                totalRevenue = BigDecimal.ZERO;
            }

            long newOrdersToday = orderRepository.countByOrderDateAfter(LocalDate.now().atStartOfDay());
            long totalProducts = productRepository.count();
            long totalUsers = userRepository.count();

            return new DashboardStatsDTO(totalRevenue, newOrdersToday, totalProducts, totalUsers);
        }
    }