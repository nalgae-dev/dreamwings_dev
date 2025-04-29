package com.nalgae.dreamnalgae.entity.obas;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RepairId implements Serializable {
    private String centerCd;
    private String carCd;
    private String repairYear;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RepairId)) return false;
        RepairId that = (RepairId) o;
        return Objects.equals(centerCd, that.centerCd) &&
               Objects.equals(carCd, that.carCd) &&
               Objects.equals(repairYear, that.repairYear);
    }

    @Override
    public int hashCode() {
        return Objects.hash(centerCd, carCd, repairYear);
    }
}
