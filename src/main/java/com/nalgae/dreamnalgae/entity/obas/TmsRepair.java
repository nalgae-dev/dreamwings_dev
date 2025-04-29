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
@Table(name = "TMS_REPAIR")
public class TmsRepair {
    @EmbeddedId
    private RepairId id;

    // 수리 날짜
    private String repairRegDt1;
    private String repairRegDt2;
    private String repairRegDt3;
    private String repairRegDt4;
    private String repairRegDt5;
    private String repairRegDt6;
    private String repairRegDt7;
    private String repairRegDt8;
    private String repairRegDt9;
    private String repairRegDt10;
    private String repairRegDt11;
    private String repairRegDt12;

    // 운전자
    private String repairDriver1;
    private String repairDriver2;
    private String repairDriver3;
    private String repairDriver4;
    private String repairDriver5;
    private String repairDriver6;
    private String repairDriver7;
    private String repairDriver8;
    private String repairDriver9;
    private String repairDriver10;
    private String repairDriver11;
    private String repairDriver12;

    // 수리내역
    private String repairSuri1;
    private String repairSuri2;
    private String repairSuri3;
    private String repairSuri4;
    private String repairSuri5;
    private String repairSuri6;
    private String repairSuri7;
    private String repairSuri8;
    private String repairSuri9;
    private String repairSuri10;
    private String repairSuri11;
    private String repairSuri12;

    // 운행거리
    private Integer repairDistance1;
    private Integer repairDistance2;
    private Integer repairDistance3;
    private Integer repairDistance4;
    private Integer repairDistance5;
    private Integer repairDistance6;
    private Integer repairDistance7;
    private Integer repairDistance8;
    private Integer repairDistance9;
    private Integer repairDistance10;
    private Integer repairDistance11;
    private Integer repairDistance12;

    // 수리 금액
    private Integer repairMoney1;
    private Integer repairMoney2;
    private Integer repairMoney3;
    private Integer repairMoney4;
    private Integer repairMoney5;
    private Integer repairMoney6;
    private Integer repairMoney7;
    private Integer repairMoney8;
    private Integer repairMoney9;
    private Integer repairMoney10;
    private Integer repairMoney11;
    private Integer repairMoney12;

    // 비고
    private String repairBigo1;
    private String repairBigo2;
    private String repairBigo3;
    private String repairBigo4;
    private String repairBigo5;
    private String repairBigo6;
    private String repairBigo7;
    private String repairBigo8;
    private String repairBigo9;
    private String repairBigo10;
    private String repairBigo11;
    private String repairBigo12;

    // 공통 관리 항목
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;
    
    private String insertId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;
    
    private String updateId;
}
