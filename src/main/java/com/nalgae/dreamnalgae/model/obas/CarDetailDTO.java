package com.nalgae.dreamnalgae.model.obas;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDetailDTO {
    private String centerCd;
    private String carCd;
    private String carRegnum;
    private String carKind;
    private String carUses;
    private String carNm;
    private String carChulYear;
    private String carChadaenum;
    private String carJuhYear;
    private String carInwon;
    private String carComp;
    private String carPurDt;
    private String carPurway;
    private Integer carPurmoney;
    private String carChkDt;
    private String carYoungDt;
    private String carBaeDt;
    private String carInsuname;
    private Integer carChainsu;
    private Integer carTotinsu;
    private String carTon;
    private String carLoadage;
    private String carGubun;
    private String carAmpm;
    private String coursegubun;
    private String userId;
    private String driver;  // u.USER_NM
}
