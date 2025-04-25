package com.nalgae.dreamnalgae.controller.obas;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nalgae.dreamnalgae.model.obas.CarListDto;
import com.nalgae.dreamnalgae.service.obas.Obas4001Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/obas")
public class Obas4001Controller {
    private final Obas4001Service obas4001Service;

    @GetMapping("/carlist")
    public List<CarListDto> getCarRepairList() {
        return obas4001Service.getCarRepairLatestDriver();
    }
}
