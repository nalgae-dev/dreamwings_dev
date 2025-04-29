package com.nalgae.dreamnalgae.entity.obas;

import java.util.Date;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "TMS_OIL")
public class TmsOil {
    @EmbeddedId
    private TmsOilId id;  // ▶️ (centerCd, oilYear, carCd 복합키)

    // 월별 주유량
    private Integer oilLitter1;
    private Integer oilLitter2;
    private Integer oilLitter3;
    private Integer oilLitter4;
    private Integer oilLitter5;
    private Integer oilLitter6;
    private Integer oilLitter7;
    private Integer oilLitter8;
    private Integer oilLitter9;
    private Integer oilLitter10;
    private Integer oilLitter11;
    private Integer oilLitter12;

    // 월별 주유금액
    private Integer oilMoney1;
    private Integer oilMoney2;
    private Integer oilMoney3;
    private Integer oilMoney4;
    private Integer oilMoney5;
    private Integer oilMoney6;
    private Integer oilMoney7;
    private Integer oilMoney8;
    private Integer oilMoney9;
    private Integer oilMoney10;
    private Integer oilMoney11;
    private Integer oilMoney12;

    // 공통 관리항목
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;
    
    private String insertId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;
    
    private String updateId;
}
