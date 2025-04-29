package com.nalgae.dreamnalgae.repository.obas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nalgae.dreamnalgae.entity.obas.TmsTax;
import com.nalgae.dreamnalgae.entity.obas.TmsTaxId;

@Repository
public interface TmsTaxRepository extends JpaRepository<TmsTax, TmsTaxId> {
    TmsTax findFirstByIdCarCd(String carCd);
}
