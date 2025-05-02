package com.nalgae.dreamnalgae.entity.obas;

import java.beans.Transient;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "TMS_CAR")
@Data
public class TmsCar {
    @EmbeddedId
    private TmsCarId id; // 복합키: CENTER_CD + CAR_CD

    @Column(name = "CAR_REGNUM")
    private String carRegnum; // 차량번호

    @Column(name = "CAR_KIND")
    private String carKind; // 중형, 대형 구분

    @Column(name = "CAR_USES")
    private String carUses; // 영업용구분

    @Column(name = "CAR_NM")
    private String carNm; // 차량명

    @Column(name = "CAR_CHUL_YEAR")
    private String carChulYear; // 년식

    @Column(name = "CAR_CHADAENUM")
    private String carChadaeNum; // 차대번호

    @Column(name = "CAR_JUH_YEAR")
    private String carJuhYear; // 소유년도

    @Column(name = "CAR_INWON")
    private String carInwon; // 인원

    @Column(name = "CAR_COMP")
    private String carComp; // 차량회사

    @Column(name = "CAR_PUR_DT")
    private String carPurDt; // 구입년도 (YYYYMMDD)

    @Column(name = "CAR_PURWAY")
    private String carPurWay; // 구입처

    @Column(name = "CAR_PURMONEY")
    private Integer carPurMoney; // 구입금액

    @Column(name = "CAR_CHK_DT")
    private String carChkDt; // 검사일자

    @Column(name = "CAR_YOUNG_DT")
    private String carYoungDt; // (설명 없음)

    @Column(name = "CAR_BAE_DT")
    private String carBaeDt; // (설명 없음)

    @Column(name = "CAR_INSUNAME")
    private String carInsuName; // 보험회사

    @Column(name = "CAR_CHAINSU")
    private Integer carChainSu; // (설명 없음)

    @Column(name = "CAR_TOTINSU")
    private Integer carTotInsu; // 무계

    @Column(name = "CAR_INSERT_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date carInsertDt; // 입력일

    @Column(name = "CAR_UPDATE_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date carUpdateDt; // 갱신일

    @Column(name = "CAR_TON")
    private String carTon; // 톤수

    @Column(name = "CAR_LOADAGE")
    private String carLoadage; // 적재부수

    @Column(name = "CAR_GUBUN")
    private String carGubun; // 구분

    @Column(name = "CAR_AMPM")
    private String carAmpm; // 부서구분

    @Column(name = "COURSEGUBUN")
    private String courseGubun; // 0:수거, 1:배송, 2:수배송, 3:특송 등

    @Column(name = "INSERT_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt; // 입력일자

    @Column(name = "INSERT_ID")
    private String insertId; // 입력자ID

    @Column(name = "UPDATE_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt; // 수정일자

    @Column(name = "UPDATE_ID")
    private String updateId; // 수정자ID

    @Column(name = "USER_ID")
    private String userId; // 사용자코드

    
}
