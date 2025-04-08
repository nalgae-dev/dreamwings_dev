package com.nalgae.dreamnalgae.controller.oman;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nalgae.dreamnalgae.entity.oman.User;
import com.nalgae.dreamnalgae.service.oman.Oman1001Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

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

}
