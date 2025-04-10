package com.nalgae.dreamnalgae.controller.oman;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nalgae.dreamnalgae.entity.oman.User;
import com.nalgae.dreamnalgae.service.oman.Oman1001Service;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/oman")
@RequiredArgsConstructor
public class Oman1001Controller {
    private final Oman1001Service oman1001Service;

    @GetMapping("/list")
    public List<User> getAllUsers() {
        return oman1001Service.getAllUsers();
    }

    // 로우 쿼리 테스트
    @GetMapping("/testrow")
    public List<Map<String, Object>> getUsersWithRegister() {
        List<Object[]> list = oman1001Service.getUsersWithRegisterName();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("테스트2", "테스트2");
            map.put("userId", row[0]);
            map.put("userNm", row[1]);
            map.put("emailAddr", row[2]);
            map.put("telNo", row[3]);
            map.put("partCd", row[4]);
            map.put("registerName", row[5]); // 등록자 이름
            result.add(map);
        }

        return result;
    }

}
