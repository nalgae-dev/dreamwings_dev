package com.nalgae.dreamnalgae.entity.obas;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class TmsOilId implements Serializable {
    private String centerCd;  // 센터코드
    private String oilYear;   // 연도
    private String carCd;     // 차량코드
    
}
