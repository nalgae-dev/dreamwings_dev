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
@Table(name = "TMS_TAX")
public class TmsTax {
    @EmbeddedId
    private TmsTaxId id;

    // 월별 등록일자
    private String taxRegDt1;
    private String taxRegDt2;
    private String taxRegDt3;
    private String taxRegDt4;
    private String taxRegDt5;
    private String taxRegDt6;
    private String taxRegDt7;
    private String taxRegDt8;
    private String taxRegDt9;
    private String taxRegDt10;
    private String taxRegDt11;
    private String taxRegDt12;

    // 월별 금액
    private String taxMoney1;
    private String taxMoney2;
    private String taxMoney3;
    private String taxMoney4;
    private String taxMoney5;
    private String taxMoney6;
    private String taxMoney7;
    private String taxMoney8;
    private String taxMoney9;
    private String taxMoney10;
    private String taxMoney11;
    private String taxMoney12;

    // 월별 내용
    private String taxContents1;
    private String taxContents2;
    private String taxContents3;
    private String taxContents4;
    private String taxContents5;
    private String taxContents6;
    private String taxContents7;
    private String taxContents8;
    private String taxContents9;
    private String taxContents10;
    private String taxContents11;
    private String taxContents12;

    // 월별 비고
    private String taxBigo1;
    private String taxBigo2;
    private String taxBigo3;
    private String taxBigo4;
    private String taxBigo5;
    private String taxBigo6;
    private String taxBigo7;
    private String taxBigo8;
    private String taxBigo9;
    private String taxBigo10;
    private String taxBigo11;
    private String taxBigo12;

    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;

    private String insertId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;

    private String updateId;
}
