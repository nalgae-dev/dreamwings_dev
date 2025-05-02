package com.nalgae.dreamnalgae.repository.obas;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nalgae.dreamnalgae.entity.obas.TmsCar;
import com.nalgae.dreamnalgae.entity.obas.TmsCarId;
import com.nalgae.dreamnalgae.model.obas.CarDetailDTO;

@Repository
public interface TmsCarRepository extends JpaRepository<TmsCar, TmsCarId> {
    //TmsCar findFirstByIdCarCd(String carCd);
    
    @Query(value = """
        SELECT
                c.CENTER_CD AS centerCd,
                c.CAR_CD AS carCd,
                c.CAR_REGNUM AS carRegnum,
                c.CAR_KIND AS carKind,
                c.CAR_USES AS carUses,
                c.CAR_NM AS carNm,
                c.CAR_CHUL_YEAR AS carChulYear,
                c.CAR_CHADAENUM AS carChadaenum,
                c.CAR_JUH_YEAR AS carJuhYear,
                c.CAR_INWON AS carInwon,
                c.CAR_COMP AS carComp,
                c.CAR_PUR_DT AS carPurDt,
                c.CAR_PURWAY AS carPurway,
                c.CAR_PURMONEY AS carPurmoney,
                c.CAR_CHK_DT AS carChkDt,
                c.CAR_YOUNG_DT AS carYoungDt,
                c.CAR_BAE_DT AS carBaeDt,
                c.CAR_INSUNAME AS carInsuname,
                c.CAR_CHAINSU AS carChainsu,
                c.CAR_TOTINSU AS carTotinsu,
                c.CAR_TON AS carTon,
                c.CAR_LOADAGE AS carLoadage,
                c.CAR_GUBUN AS carGubun,
                c.CAR_AMPM AS carAmpm,
                c.COURSEGUBUN AS coursegubun,
                c.USER_ID AS userId,
                u.USER_NM AS driver
            FROM TMS_CAR c
            LEFT JOIN TMS_USER_M u ON c.USER_ID = u.USER_ID
            WHERE c.CAR_CD = :carCd
        """, nativeQuery = true)
    CarDetailDTO getCarInfo(@Param("carCd") String carCd);
}
