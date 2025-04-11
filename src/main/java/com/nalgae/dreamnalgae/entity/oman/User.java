package com.nalgae.dreamnalgae.entity.oman;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "TB_USER_M")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "CHULPAN_CD")
    private String chulpanCd;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "CHULPANSA_NM")
    private String chulpansaNm;

    @Column(name = "USER_LEVEL_GB")
    private String userLevelGb;

    @Column(name = "AUTH_MODIFY")
    private String authModify;

    @Column(name = "AUTH_INSERT")
    private String authInsert;

    @Column(name = "PART_CD")
    private String partCd;

    @Column(name = "PASS_WD")
    private String passWd;

    @Column(name = "START_DT")
    @Temporal(TemporalType.DATE)
    private Date startDt;

    @Column(name = "END_DT")
    @Temporal(TemporalType.DATE)
    private Date endDt;

    @Column(name = "EMAIL_ADDR")
    private String emailAddr;

    @Column(name = "USER_GB")
    private String userGb;

    @Column(name = "POST_NO")
    private String postNo;

    @Column(name = "ADDR1")
    private String addr1;

    @Column(name = "POSI_NM")
    private String posiNm;

    @Column(name = "JUMIN_NO")
    private String juminNo;

    @Column(name = "TEL_NO")
    private String telNo;

    @Column(name = "BIGO")
    private String bigo;

    @Column(name = "CP_TEL_NO")
    private String cpTelNo;

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

    @Column(name = "FAX_NO")
    private String faxNo;

    @Column(name = "SUJUM_CD")
    private String sujumCd;

    @Column(name = "SMART_YN")
    private String smartYn;

    @Column(name = "SMART_HP")
    private String smartHp;

    @Column(name = "SMART_MAC")
    private String smartMac;

    @Column(name = "NOTICE_YN")
    private Integer noticeYn;
}
