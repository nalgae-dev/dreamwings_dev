package com.nalgae.dreamnalgae.repository.obas;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nalgae.dreamnalgae.entity.obas.TmsSell;
import com.nalgae.dreamnalgae.entity.obas.TmsSellId;

public interface TmsSellRepository  extends JpaRepository<TmsSell, TmsSellId> {
    TmsSell findFirstByIdCarCd(String carCd);
}
