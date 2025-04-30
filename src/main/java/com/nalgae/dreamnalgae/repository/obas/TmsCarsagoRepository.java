package com.nalgae.dreamnalgae.repository.obas;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nalgae.dreamnalgae.entity.obas.TmsCarsago;
import com.nalgae.dreamnalgae.entity.obas.TmsCarsagoId;

public interface TmsCarsagoRepository extends JpaRepository<TmsCarsago,TmsCarsagoId> {
    TmsCarsago findFirstByIdCarCd(String carCd);
}
