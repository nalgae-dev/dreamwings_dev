package com.nalgae.dreamnalgae.entity.obas;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class TmsCarId implements Serializable {
    @Column(name = "CENTER_CD")
    private String centerCd;

    @Column(name = "CAR_CD")
    private String carCd;
    
}
