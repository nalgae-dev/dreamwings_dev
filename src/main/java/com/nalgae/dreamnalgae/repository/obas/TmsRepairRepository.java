package com.nalgae.dreamnalgae.repository.obas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nalgae.dreamnalgae.entity.obas.RepairId;
import com.nalgae.dreamnalgae.entity.obas.TmsRepair;

@Repository
public interface TmsRepairRepository extends JpaRepository<TmsRepair, RepairId> {
    // 차량코드로 조회
    TmsRepair findFirstByIdCarCd(String carCd);
}