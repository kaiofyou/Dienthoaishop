package com.mycompany.dienthoaishop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private BigDecimal totalRevenue;
    private long newOrdersToday;
    private long totalProducts;
    private long totalUsers;
}