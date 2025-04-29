package com.nalgae.dreamnalgae.repository.obas;

import com.nalgae.dreamnalgae.model.obas.CarListDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class Oman4001Repository {

    @PersistenceContext
    private EntityManager em;

    public List<CarListDto> getCarRepairLatestDriver() {
        String sql = """
            SELECT 
             center_cd as centerCd,
             car_cd as carCd,
             car_regnum as carRegnum,
             car_kind as repairDriver,
             car_nm as carNm
            FROM TMS_CAR
            """;

        List<Object[]> results = em.createNativeQuery(sql).getResultList();

        System.out.println(results);
        return results.stream().map(r -> new CarListDto(
            (String) r[0],
            (String) r[1],
            (String) r[2], 
            (String) r[3],
            (String) r[4]
        )).toList();
    }
}


