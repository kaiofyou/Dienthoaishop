package com.mycompany.dienthoaishop.service;

import com.mycompany.dienthoaishop.dto.OrderRequestDTO;
import com.mycompany.dienthoaishop.dto.OrderItemRequest;
import com.mycompany.dienthoaishop.model.Order;
import com.mycompany.dienthoaishop.model.OrderItem;
import com.mycompany.dienthoaishop.model.Product;
import com.mycompany.dienthoaishop.model.User;
import com.mycompany.dienthoaishop.repository.OrderRepository;
import com.mycompany.dienthoaishop.repository.ProductRepository;
import com.mycompany.dienthoaishop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order createOrder(OrderRequestDTO orderRequest) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setPaymentMethod(orderRequest.getPaymentMethod());

        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> itemsToSave = new ArrayList<>();

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemRequest.getProductId()));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());


            // Lấy giá cuối cùng (giá giảm giá nếu có, nếu không thì lấy giá gốc)
            BigDecimal priceAtPurchase = product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getPrice();
            orderItem.setPriceAtPurchase(priceAtPurchase);
            // ---------------------------

            orderItem.setOrder(order);

            itemsToSave.add(orderItem);
            // Tính tổng tiền dựa trên giá cuối cùng
            totalPrice = totalPrice.add(priceAtPurchase.multiply(new BigDecimal(itemRequest.getQuantity())));

            product.setStock(product.getStock() - itemRequest.getQuantity());
            productRepository.save(product);
        }

        order.setOrderItems(itemsToSave);
        order.setTotalPrice(totalPrice);

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public List<Order> getMyOrders() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "orderDate"));
    }

    @Transactional(readOnly = true)
    public Order getOrderByIdForUser(Long orderId) throws AccessDeniedException {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        if (!order.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to view this order");
        }
        return order;
    }

    @Transactional(readOnly = true)
    public Order getOrderByIdForAdmin(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
