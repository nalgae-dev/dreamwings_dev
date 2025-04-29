package com.nalgae.dreamnalgae.entity.obas;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class TmsTaxId implements Serializable {
    private String centerCd;
    private String carCd;
    private String taxYear;  // 📌 주의: TAX_YEAR!
}
