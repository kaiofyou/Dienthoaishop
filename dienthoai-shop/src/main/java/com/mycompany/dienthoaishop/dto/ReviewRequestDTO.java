package com.mycompany.dienthoaishop.dto;

import lombok.Data;

@Data
public class ReviewRequestDTO {
    private Long productId;
    private int rating;
    private String comment;
}
