package com.nalgae.dreamnalgae.repository.oman;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nalgae.dreamnalgae.entity.oman.User;

public interface Oman1001Repository extends JpaRepository<User, String> {
    @Query(value = """
            SELECT
                u.USER_ID,
                u.USER_NM,
                u.EMAIL_ADDR,
                u.TEL_NO,
                u.PART_CD,
                reg.USER_NM AS REGISTER_NAME
            FROM
                TB_USER_M u
            LEFT JOIN
                TB_USER_M reg ON u.INSERT_ID = reg.USER_ID
            WHERE
                u.EMAIL_ADDR IS NOT NULL
            """, nativeQuery = true)
    List<Object[]> findUsersWithRegisterName();

}
