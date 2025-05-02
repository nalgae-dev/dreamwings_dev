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
             c.center_cd as centerCd,
             c.car_cd as carCd,
             c.car_regnum as carRegnum,
             u.user_nm as repairDriver,
             c.car_nm as carNm
            FROM TMS_CAR c
            LEFT JOIN TMS_USER_M u ON c.USER_ID = u.USER_ID
            """;

        List<Object[]> results = em.createNativeQuery(sql).getResultList();

        return results.stream().map(r -> new CarListDto(
            (String) r[0],
            (String) r[1],
            (String) r[2], 
            (String) r[3],
            (String) r[4]
        )).toList();
    }
}


