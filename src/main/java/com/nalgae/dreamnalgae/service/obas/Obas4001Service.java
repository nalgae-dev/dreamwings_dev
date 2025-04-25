package com.nalgae.dreamnalgae.service.obas;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nalgae.dreamnalgae.model.obas.CarListDto;
import com.nalgae.dreamnalgae.repository.obas.Oman4001Repository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Obas4001Service {
    private final Oman4001Repository oman4001Repository;

    public List<CarListDto> getCarRepairLatestDriver ()  {
        return oman4001Repository.getCarRepairLatestDriver();

    }
}
