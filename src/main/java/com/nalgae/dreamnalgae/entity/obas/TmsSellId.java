package com.nalgae.dreamnalgae.entity.obas;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class TmsSellId implements Serializable {
    private String centerCd;
    private String carCd;
    private String sellYear;
}
