package com.nalgae.dreamnalgae.repository.obas;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nalgae.dreamnalgae.entity.obas.TmsCar;
import com.nalgae.dreamnalgae.entity.obas.TmsCarId;

@Repository
public interface TmsCarRepository extends JpaRepository<TmsCar, TmsCarId> {
    TmsCar findFirstByIdCarCd(String carCd);
}
