package com.nalgae.dreamnalgae.entity.oman;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "EMAIL_ADDR")
    private String emailAddr;

    @Column(name = "TEL_NO")
    private String telNo;

    @Column(name = "PART_CD")
    private String partCd;

    // 필요한 컬럼만 추가했습니다. 원하면 전체 컬럼도 만들어드릴게요.
}
