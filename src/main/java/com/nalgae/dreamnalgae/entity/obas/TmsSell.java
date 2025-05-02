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
@Table(name = "TMS_SELL")
public class TmsSell {
    @EmbeddedId
    private TmsSellId id;

    private String sellRegDt1;
    private String sellRegDt2;
    private String sellRegDt3;

    private String sellGubun1;
    private String sellGubun2;
    private String sellGubun3;

    private String sellSayou1;
    private String sellSayou2;
    private String sellSayou3;

    private String sellWay1;
    private String sellWay2;
    private String sellWay3;

    private Integer sellMoney1;
    private Integer sellMoney2;
    private Integer sellMoney3;

    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;

    private String insertId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;

    private String updateId;
}
