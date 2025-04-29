package com.nalgae.dreamnalgae.model.obas;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class OilupdateRequest {
    private String centerCd;
    private String carCd;
    private String oilYear;
    private List<OilMonthData> oilData = new ArrayList<>(); // 무조건 초기화 ★
}


