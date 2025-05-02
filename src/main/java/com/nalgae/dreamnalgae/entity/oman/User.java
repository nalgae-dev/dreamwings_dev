package com.nalgae.dreamnalgae.entity.oman;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "TMS_COM_USER")
@IdClass(UserId.class) // 복합키 클래스 필요
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "USER_ID")
    private String userId;

    @Id
    @Column(name = "USER_CET_CD")
    private String userCetCd;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "N_DEPT_CD")
    private String nDeptCd;

    @Column(name = "JIKWEE_CD")
    private String jikwieCd;

    @Column(name = "JIKCHK_CD")
    private String jikchkCd;

    @Column(name = "JAEJIK_GB")
    private String jaejikGb;

    @Column(name = "ENTER_DT")
    @Temporal(TemporalType.DATE)
    private Date enterDt;

    @Column(name = "RETIRE_DT")
    @Temporal(TemporalType.DATE)
    private Date retireDt;

    @Column(name = "JIKWEE_NM")
    private String jikwieNm;

    @Column(name = "EXT_TEL_NO")
    private String extTelNo;

    @Column(name = "PASS_WD")
    private String passWd;

    @Column(name = "USER_LEVEL_GB")
    private String userLevelGb;

    @Column(name = "USER_AUTH_RW")
    private String userAuthRw;

    @Column(name = "CHULPAN_CD")
    private String chulpanCd;

    @Column(name = "INS_USER_ID")
    private String insUserId;

    @Column(name = "INF_USER_ID")
    private String infUserId;

    @Column(name = "TEL_NO")
    private String telNo;

    @Column(name = "FAX_NO")
    private String faxNo;

    @Column(name = "EMAIL_ADDR")
    private String emailAddr;

    @Column(name = "USER_CHK_GB")
    private String userChkGb;

    @Column(name = "BANP_INS_ID")
    private String banpInsId;

    @Column(name = "USER_AUTH_ADM")
    private String userAuthAdm;

    @Column(name = "USE_YN")
    private String useYn;

    @Column(name = "BIGO")
    private String bigo;

    @Column(name = "EMP_ID")
    private String empId;

    @Column(name = "USER_ID_OLD")
    private String userIdOld;

    @Column(name = "INSERT_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertDt;

    @Column(name = "INSERT_ID")
    private String insertId;

    @Column(name = "UPDATE_DT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDt;

    @Column(name = "UPDATE_ID")
    private String updateId;

    @Column(name = "JIYUK_CD")
    private String jiyukCd;

    @Column(name = "LAST_LOGIN_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLoginTime;

    @Column(name = "TEL_NO1")
    private String telNo1;

    @Column(name = "TEL_NO2")
    private String telNo2;

    @Column(name = "TEL_NO3")
    private String telNo3;

    @Column(name = "JIKCHK_DT")
    @Temporal(TemporalType.DATE)
    private Date jikchkDt;

    @Column(name = "GEUNMOO_JO")
    private String geunmooJo;

    @Column(name = "LAST_LOGIN_ADDR")
    private String lastLoginAddr;

    @Column(name = "DEPT_CD")
    private String deptCd;

    @Column(name = "PDA_NO")
    private String pdaNo;

    @Column(name = "PDA_BUL_DT")
    @Temporal(TemporalType.DATE)
    private Date pdaBulDt;

    @Column(name = "PDA_BAN_DT")
    @Temporal(TemporalType.DATE)
    private Date pdaBanDt;

    @Column(name = "WIN_UNIFORM_BUL_DT")
    @Temporal(TemporalType.DATE)
    private Date winUniformBulDt;

    @Column(name = "WIN_UNIFORM_BAN_DT")
    @Temporal(TemporalType.DATE)
    private Date winUniformBanDt;

    @Column(name = "SUM_UNIFORM_BUL_DT")
    @Temporal(TemporalType.DATE)
    private Date sumUniformBulDt;

    @Column(name = "SUM_UNIFORM_BAN_DT")
    @Temporal(TemporalType.DATE)
    private Date sumUniformBanDt;
}
