package com.nalgae.dreamnalgae.entity.oman;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserId implements Serializable {
    private String userId;
    private String userCetCd;
}
