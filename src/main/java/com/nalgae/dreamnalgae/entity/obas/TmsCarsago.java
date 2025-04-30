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
@Table(name = "TMS_CARSAGO")
public class TmsCarsago {
    @EmbeddedId
    private TmsCarsagoId id;

    private String carsagoDriver1;
    private String carsagoDriver2;
    private String carsagoDriver3;
    private String carsagoDriver4;
    private String carsagoDriver5;
    private String carsagoDriver6;
    private String carsagoDriver7;
    private String carsagoDriver8;
    private String carsagoDriver9;
    private String carsagoDriver10;
    private String carsagoDriver11;
    private String carsagoDriver12;

    private Integer carsagoPhMoney1;
    private Integer carsagoPhMoney2;
    private Integer carsagoPhMoney3;
    private Integer carsagoPhMoney4;
    private Integer carsagoPhMoney5;
    private Integer carsagoPhMoney6;
    private Integer carsagoPhMoney7;
    private Integer carsagoPhMoney8;
    private Integer carsagoPhMoney9;
    private Integer carsagoPhMoney10;
    private Integer carsagoPhMoney11;
    private Integer carsagoPhMoney12;

    private String carsagoInsuGu1;
    private String carsagoInsuGu2;
    private String carsagoInsuGu3;
    private String carsagoInsuGu4;
    private String carsagoInsuGu5;
    private String carsagoInsuGu6;
    private String carsagoInsuGu7;
    private String carsagoInsuGu8;
    private String carsagoInsuGu9;
    private String carsagoInsuGu10;
    private String carsagoInsuGu11;
    private String carsagoInsuGu12;

    private Integer carsagoBsMoney1;
    private Integer carsagoBsMoney2;
    private Integer carsagoBsMoney3;
    private Integer carsagoBsMoney4;
    private Integer carsagoBsMoney5;
    private Integer carsagoBsMoney6;
    private Integer carsagoBsMoney7;
    private Integer carsagoBsMoney8;
    private Integer carsagoBsMoney9;
    private Integer carsagoBsMoney10;
    private Integer carsagoBsMoney11;
    private Integer carsagoBsMoney12;

    private String carsagoContents1;
    private String carsagoContents2;
    private String carsagoContents3;
    private String carsagoContents4;
    private String carsagoContents5;
    private String carsagoContents6;
    private String carsagoContents7;
    private String carsagoContents8;
    private String carsagoContents9;
    private String carsagoContents10;
    private String carsagoContents11;
    private String carsagoContents12;

    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;
    
    private String insertId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;
    
    private String updateId;
}
