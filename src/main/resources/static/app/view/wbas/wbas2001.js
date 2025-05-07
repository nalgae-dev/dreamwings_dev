Ext.define('DreamNalgae.view.wbas.wbas2001', {
    extend: 'Ext.panel.Panel',
    xtype: 'wbas2001',
    layout: 'border',
    controller: {

    },
    items:[
        {
            xtype:'panel',
            region:'center',
            layout: 'vbox',
            padding: 2,
            scrollable: 'vertical',
            align:'stretch',
            //title:'거래처기본정보관리(WBAS2001)',
            tbar:[
                {
                    xtype: 'component',
                    html: '<b>거래처기본정보관리 [WBAS2001]</b>',
                    style: 'margin-left:10px; color:#003366;',
                    width: 300
                },
                '->',
                { xtype: 'button', text: '초기화', iconCls: 'x-fa fa-undo', handler: function() { alert('초기화'); } },
                { xtype: 'button', text: '조회', iconCls: 'x-fa fa-search', handler: function() { alert('조회'); } },
                { xtype: 'button', text: '엑셀', iconCls: 'x-fa fa-file-excel' },
                { xtype: 'button', text: '종료', iconCls: 'x-fa fa-times' }

            ],
            items:[
                // 1. 검색 조건 영역
                {
                    xtype: 'fieldset',
                    //title: '검색 조건',
                    width: '100%',
                    bodyPadding: 1,
                    layout: {
                        type: 'table',
                        columns: 7  // 줄 수에 따라 조절 가능
                    },
                    defaults: {
                        xtype: 'combo',
                        labelAlign: 'right',
                        labelWidth: 100,
                        margin: '5 5 0 0',
                        editable: false,
                        queryMode: 'local',
                        width: 200
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '거래처',
                            name: 'partnerNm',
                            width: 200
                        },
                        {
                            xtype: 'textfield',
                            //fieldLabel: '거래처',
                            name: 'partnerNm2',
                            width: 200
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            tooltip: '검색',
                            margin: '5 5 0 0',
                            width: 50
                        },
                        { fieldLabel: '출고팀', store: ['전체'] },
                        { fieldLabel: '출고위탁', store: ['전체'] },
                        { fieldLabel: '거래중여부', store: ['전체'] },
                        { fieldLabel: '분류코드자유유무', store: ['전체'] },
                        { fieldLabel: '거래처분류', store: ['전체'] },
                        { fieldLabel: '판매형태', store: ['전체'] },
                        { fieldLabel: '사용유무', store: ['전체'] },
                        { fieldLabel: '반품팀', store: ['전체'] },
                        { fieldLabel: '반품관리위탁', store: ['전체'] },
                        { fieldLabel: '변지출력여부', store: ['전체'] },
                        {
                            fieldLabel: '출판사관리레벨',
                            store: ['낮음', '보통', '높음'],
                            value: '낮음'
                        }
                    ]
                },
                

                // 2. 버튼 영역
                {
                    xtype: 'toolbar',
                    width: '100%',
                    items: [
                        { xtype: 'tbtext', text: '<b>거래처 목록</b>', margin: '0 10 0 0' },
                        { xtype: 'button', text: '바코드 인쇄', iconCls: 'x-fa fa-barcode' },
                        { xtype: 'numberfield',width:40},
                        { xtype: 'button', text: '장 인쇄'}
                    ]
                },

                // 3. 그리드 영역
                {
                    xtype: 'grid',
                    height: 180,
                    width: '100%',
                    reference: 'partnerGrid',
                    store: {
                        fields: ['partnerCd', 'partnerNm', 'region', 'outType', 'outCharge', 'contactTel', 'faxNo', 'type', 'type2'],
                        data: [
                            { partnerCd: 'C00837', partnerNm: 'Great Love(한강물류)', region: '인천부평구', outType: '택배', outCharge: '홍길동', contactTel: '032-516-0515', faxNo: '032-362-0515', type: '출판사', type2: '서점' },
                            { partnerCd: '091-230', partnerNm: '(JC)글로벌여자학원', region: '인천부평구', outType: '택배', outCharge: '김민수', contactTel: '032-111-2222', faxNo: '032-111-3333', type: '출판사', type2: '방문출고' },
                            { partnerCd: '425-049', partnerNm: '(X)X서점(북서안산점)', region: '안산', outType: '택배', outCharge: '이수현', contactTel: '031-439-4081', faxNo: '031-439-4081', type: '서점', type2: '서점' },
                            { partnerCd: '650-048', partnerNm: '한국도서정보', region: '진주', outType: '택배', outCharge: '장지우', contactTel: '055-753-6232', faxNo: '055-753-6232', type: '서점', type2: '서점' },
                            { partnerCd: '090-777', partnerNm: '굿북코퍼레이션', region: '홍성', outType: '택배', outCharge: '박서준', contactTel: '041-631-3914', faxNo: '041-631-3914', type: '서점', type2: '서점' }
                        ]  // 실제 데이터는 API 연동
                    },
                    columns: [
                        { text: 'NO', xtype: 'rownumberer', width: 50 },
                        { text: '거래처코드', dataIndex: 'partnerCd', width: 100 },
                        { text: '약식명', dataIndex: 'partnerNm', width: 150 },
                        { text: '지역명', dataIndex: 'region', width: 100 },
                        { text: '출고형태', dataIndex: 'outType', width: 80 },
                        { text: '출고담당', dataIndex: 'outCharge', width: 120 },
                        { text: '전화번호', dataIndex: 'contactTel', width: 120 },
                        { text: '팩스번호', dataIndex: 'faxNo', width: 120 },
                        { text: '거래분류', dataIndex: 'type', width: 80 },
                        { text: '소속', dataIndex: 'type2', width: 100 }
                    ]
                },

                // 거래처정보
                {
                    xtype: 'form',
                    //title: '거래처 상세정보',
                    width: '100%',
                    bodyPadding: 1,
                    layout: {
                        type: 'table',
                        columns: 6,
                        tdAttrs: { style: 'padding:1px;' }
                    },
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        labelWidth: 80,
                        width: 250
                    },
                    items: [
                        { fieldLabel: '거래처코드', name: 'partnerCd' },
                        { xtype: 'button', text: '거래처코드 추가', colspan: 1 },
                        { fieldLabel: '거래처명', name: 'partnerNm', colspan: 2, width: 500, style: 'background: yellow' },
                        { fieldLabel: '약식명', name: 'shortNm' },
                        { fieldLabel: '정식상호', name: 'legalNm', colspan: 2 },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: '거래기간',
                            layout: 'hbox',
                            items: [
                                { xtype: 'datefield', name: 'fromDt', width: 120 },
                                { xtype: 'displayfield', value: '~', width: 20 },
                                { xtype: 'datefield', name: 'toDt', width: 120 }
                            ]
                        },
                        { xtype: 'combo', fieldLabel: '거래처형태', store: ['서점', '출판사'], editable: false },
                        { xtype: 'combo', fieldLabel: '사용여부', store: ['사용', '미사용'], editable: false },
                        { fieldLabel: '지역', name: 'region' },
                        { fieldLabel: '출고형태', xtype: 'combo', store: ['택배', '방문'], editable: false },
                        { fieldLabel: '출고담당', name: 'outCharge' },
                        { fieldLabel: '전화번호', name: 'tel1' },
                        { fieldLabel: '전화번호2', name: 'tel2' },
                        { fieldLabel: '팩스번호', name: 'fax' },
                        { fieldLabel: 'EMAIL1', name: 'email1' },
                        { fieldLabel: 'EMAIL2', name: 'email2' },
                        { fieldLabel: 'EMAIL3', name: 'email3' },
                        { fieldLabel: '배본소', name: 'deliveryCenter' },
                        { fieldLabel: '출고형태', xtype: 'combo', store: ['택배', '방문'], editable: false },
                        { fieldLabel: '코스순번', name: 'courseSeq' },
                        { fieldLabel: '배본코스', name: 'deliveryCourse' },
                        { fieldLabel: '업체코드', name: 'vendorCode' },
                        { fieldLabel: '사업자번호', name: 'bizNo' },
                        { fieldLabel: '대표자명', name: 'ceoName' },
                        { fieldLabel: '업태', name: 'bizType' },
                        { fieldLabel: '종목', name: 'bizItem' },
                        { fieldLabel: '우편번호', name: 'zip' },
                        { fieldLabel: '주소', name: 'addr' },
                        { fieldLabel: '상세주소', name: 'addrDetail' },
                        { fieldLabel: 'PISS적용업체', name: 'pissCompany', style: 'color:red;font-weight:bold;' },
                        { fieldLabel: '담당자', name: 'staffName' },
                        { fieldLabel: '출고', name: 'staffOut' },
                        { fieldLabel: '반품', name: 'staffReturn' },
                        { fieldLabel: '전산', name: 'staffIt' },
                        { fieldLabel: '영업', name: 'staffSales' },
                        { fieldLabel: '휴대폰', name: 'staffPhone' }
                    ]
                }
            ]
        }
    ]


});