package com.mycompany.dienthoaishop.repository;

import com.mycompany.dienthoaishop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA sẽ tự động tạo ra câu lệnh query để tìm User theo username
    Optional<User> findByUsername(String username);

}