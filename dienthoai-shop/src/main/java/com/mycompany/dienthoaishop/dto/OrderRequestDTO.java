package com.mycompany.dienthoaishop.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDTO {
    private List<OrderItemRequest> items;
    private String paymentMethod;
}