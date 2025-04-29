package com.nalgae.dreamnalgae.repository.obas;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nalgae.dreamnalgae.entity.obas.TmsOil;
import com.nalgae.dreamnalgae.entity.obas.TmsOilId;

public interface TmsOilRepository extends JpaRepository<TmsOil, TmsOilId> {
    TmsOil findFirstByIdCarCd(String carCd);
}
