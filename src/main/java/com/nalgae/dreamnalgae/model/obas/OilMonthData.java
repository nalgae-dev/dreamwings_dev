package com.nalgae.dreamnalgae.model.obas;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OilMonthData {
    private int month;     // 1~12
    private int litter;    // 주유량
    private int money;     // 주유금액
}