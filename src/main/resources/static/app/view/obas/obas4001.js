Ext.define('DreamNalgae.view.obas.obas4001', {
    extend: 'Ext.panel.Panel',
    xtype: 'obas4001',
    layout: 'border',
    controller: {

    },
  
    items: [
        {
          region: 'west',
          xtype: 'grid',
          width: 400,
          //title: '입고 확인 조회',
          reference: 'carGrid',  // 참조용 id 설정 (선택 사항)
          tbar: [
            {
              xtype: 'textfield',
              itemId: 'searchField', // 버튼과 연결될 ID
              //fieldLabel: '제목 검색',
              labelAlign: 'right',
              labelWidth: 70,
              width: 200,
              emptyText: '차량 번호 입력...'
            },
            {
              xtype: 'button',
              text: '검색',
              iconCls: 'x-fa fa-search',
              handler: function (btn) {
                const grid = btn.up('grid');
                const value = grid.down('#searchField').getValue();
                const store = grid.getStore();
                store.clearFilter();
                if (value) {
                  store.filterBy(record => {
                    return record.get('carRegnum').includes(value);
                  });
                }
              }
            },
            {
              xtype: 'button',
              text: '초기화',
              iconCls: 'x-fa fa-undo',
              handler: function (btn) {
                const grid = btn.up('grid');
                grid.down('#searchField').setValue('');
                grid.getStore().clearFilter();
              }
            }
          ],
          store: {
            autoLoad: true,
            fields: ['carRegnum', 'repairDriver', 'carNm'],
            proxy: {
              type: 'ajax',
              url:'/obas/carlist',
              reader: { type: 'json'}
            }
          },
          columns: [
            { text: '차량번호', dataIndex: 'carRegnum', flex: 2 },
            { text: '운전자', dataIndex: 'repairDriver', flex: 1 },
            { text: '차명', dataIndex: 'carNm', flex: 2 },
          ]
        }, // west 영역 끝
        {
          region: 'center',
          xtype: 'panel',
          scrollable: 'vertical',
          layout: {
            type:'vbox',
            align:'stretch'
          },
          items:[
            // 차량기본정보 시작작
            {
              xtype: 'panel',
              title: '차량기본정보',
              layout: {
                type: 'vbox',
                align: 'stretch'
              },
              //padding: 10,
              items: [
                // [1] 차량 기본정보
                {
                  xtype: 'form',
                  layout: {
                    type: 'table',
                    columns: 3 // ▶️ 한 줄에 3개 항목씩 배치
                  },
                  defaults: {
                    xtype: 'textfield',
                    labelWidth: 100,
                    labelAlign: 'right',
                    width: 300,   // ▶️ 한 셀의 너비
                    margin: '5 15 5 5'
                  },
                  items: [
                    { fieldLabel: '운전자명', name: 'driver' },
                    { fieldLabel: '차량톤수', name: 'carTon' },
                    { fieldLabel: '적재량', name: 'carLoadage' },
                    { fieldLabel: '차량등록번호', name: 'carRegnum' },
                    { fieldLabel: '종별', name: 'carKind' },
                    { fieldLabel: '용도', name: 'carUses' },
            
                    { fieldLabel: '차명(차량코드)', name: 'carNm' },
                    { fieldLabel: '형식 및 년식', name: 'carYear' },
                    { fieldLabel: '차대번호', name: 'carChadaeNum' },
                    { fieldLabel: '내용연수', name: 'carUseYear' },
                    { fieldLabel: '차량구분', name: 'carGubun' },
                    { fieldLabel: '제조회사', name: 'carComp' },
            
                    { fieldLabel: '취득년월일', name: 'carPurDt' },
                    { fieldLabel: '취득방법', name: 'carPurWay' },
                    { fieldLabel: '취득금액', name: 'carPurMoney' }
                  ]
                },

                {
                  xtype: 'fieldset',
                  //title: '검사일정',
                  layout: {
                    type: 'table',
                    columns: 4  // ▶ 왼쪽 레이블 병합 영역 + 3개 검사일
                  },
                  defaults: {
                    margin: 5
                  },
                  items: [
                    // ① 왼쪽 병합 라벨
                    {
                      xtype: 'component',
                      html: '<div style="height:60px; line-height:60px; font-weight:bold;">검사일정</div>',
                      rowspan: 2,
                      width: 100,
                      style: 'text-align:center; border-right:1px solid #ccc;',
                    },
                    // ② 첫 번째 행 - 필드 이름 라벨
                    {
                      xtype: 'component',
                      html: '<b>정기검사</b>',
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'component',
                      html: '<b>영업용검사</b>',
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'component',
                      html: '<b>배출가스검사</b>',
                      style: 'text-align:center;',
                      width: 200
                    },
                    // ③ 두 번째 행 - 실제 검사일 데이터
                    {
                      xtype: 'displayfield',
                      name: 'chkDate',
                      value: '2009-08-26',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'displayfield',
                      name: 'bizChkDate',
                      value: '2009-12-08',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'displayfield',
                      name: 'gasChkDate',
                      value: '2009-08-26',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 200
                    }
                  ]
                },
                {
                  xtype: 'fieldset',
                  //title: '보험관리',
                  layout: {
                    type: 'table',
                    columns: 5  // ▶ 왼쪽 병합 레이블 + 4개 컬럼
                  },
                  defaults: {
                    margin: 5
                  },
                  items: [
                    // ① 왼쪽 병합된 라벨
                    {
                      xtype: 'component',
                      html: '<div style="height:60px; line-height:60px; font-weight:bold;">보험관리</div>',
                      rowspan: 2,
                      width: 100,
                      style: 'text-align:center; border-right:1px solid #ccc;'
                    },
                    // ② 첫 번째 행 - 제목 라벨들
                    {
                      xtype: 'component',
                      html: '<b>보험사</b>',
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'component',
                      html: '<b>책임보험료</b>',
                      style: 'text-align:center;',
                      width: 150
                    },
                    {
                      xtype: 'component',
                      html: '<b>종합보험료</b>',
                      style: 'text-align:center;',
                      width: 150
                    },
                    {
                      xtype: 'component',
                      html: '<b>연보험료(책임+종합)</b>',
                      style: 'text-align:center;',
                      width: 180
                    },
                    // ③ 두 번째 행 - 실제 데이터 필드
                    {
                      xtype: 'displayfield',
                      name: 'insCompany',
                      value: '경기화물공제조합',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 200
                    },
                    {
                      xtype: 'displayfield',
                      name: 'insAmount1',
                      value: '515,100 원',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 150
                    },
                    {
                      xtype: 'displayfield',
                      name: 'insAmount2',
                      value: '564,300 원',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 150
                    },
                    {
                      xtype: 'displayfield',
                      name: 'insTotal',
                      value: '1,079,400 원',
                      hideLabel: true,
                      style: 'text-align:center;',
                      width: 180
                    }
                  ]
                }
              ]
            },
            
            // 차량 주유내역
            {
              xtype: 'fieldset',
              title: '차량주유내역',
              layout: {
                type: 'hbox',
                align: 'stretch'
              },
              padding: 10,
              items: [
                // 왼쪽 그리드: 홀수 월
                {
                  xtype: 'grid',
                  //title: '홀수월 주유내역',
                  flex: 1,
                  autoHeight: true,
                  margin: '0 10 0 0',
                  columns: [
                    { text: '월', dataIndex: 'month', flex: 1 },
                    { text: '주유량(리터)', dataIndex: 'litter', flex: 1 },
                    { text: '주유금액', dataIndex: 'money', flex: 1 }
                  ],
                  store: {
                    fields: ['month', 'litter', 'money'],
                    data: [
                      { month: '1월', litter: '10리터', money: '11원' },
                      { month: '3월', litter: '0리터', money: '0원' },
                      { month: '5월', litter: '0리터', money: '0원' },
                      { month: '7월', litter: '0리터', money: '0원' },
                      { month: '9월', litter: '0리터', money: '0원' },
                      { month: '11월', litter: '0리터', money: '0원' }
                    ]
                  }
                },
            
                // 오른쪽 그리드: 짝수 월
                {
                  xtype: 'grid',
                  //title: '짝수월 주유내역',
                  flex: 1,
                  autoHeight: true,
                  columns: [
                    { text: '월', dataIndex: 'month', flex: 1 },
                    { text: '주유량(리터)', dataIndex: 'litter', flex: 1 },
                    { text: '주유금액', dataIndex: 'money', flex: 1 }
                  ],
                  store: {
                    fields: ['month', 'litter', 'money'],
                    data: [
                      { month: '2월', litter: '2리터', money: '22원' },
                      { month: '4월', litter: '0리터', money: '0원' },
                      { month: '6월', litter: '0리터', money: '0원' },
                      { month: '8월', litter: '0리터', money: '0원' },
                      { month: '10월', litter: '0리터', money: '0원' },
                      { month: '12월', litter: '0리터', money: '0원' }
                    ]
                  }
                }
              ]
            },
            
            // 차량 수리 내역
            {
              xtype: 'grid',
              title: '차량수리내역',
              margin: '10 0',
              autoHeight: true,
              columns: [
                { text: '일자', dataIndex: 'regDate', flex: 1 },
                { text: '운전자', dataIndex: 'driver', flex: 1 },
                { text: '수리내역', dataIndex: 'suri', flex: 2 },
                { text: '운행거리', dataIndex: 'distance', flex: 1 },
                { text: '금액', dataIndex: 'money', flex: 1 },
                { text: '비고', dataIndex: 'bigo', flex: 2 }
              ],
              store: {
                fields: ['regDate', 'driver', 'suri', 'distance', 'money', 'bigo'],
                data: [
                  { regDate: '2025-04-21', driver: '강병선', suri: 'A', distance: '100Km', money: '1,000원', bigo: '11' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' },
                  { regDate: '', driver: '', suri: '', distance: '0Km', money: '0원', bigo: '' }
                ]
              }
            },
            


            // 차량 사고 현황
            {
              xtype: 'grid',
              title: '차량사고현황',
              //height: 300,
              autoHeight: true,
              margin: '10 0',
              columns: [
                { text: '순번', dataIndex: 'no', width: 60 },
                { text: '운전자', dataIndex: 'driver', flex: 1 },
                { text: '피해금액', dataIndex: 'phMoney', flex: 1 },
                { text: '보험처리여부', dataIndex: 'insuYn', flex: 1 },
                { text: '보상금액', dataIndex: 'bsMoney', flex: 1 },
                { text: '사고경위', dataIndex: 'contents', flex: 2 }
              ],
              store: {
                fields: ['no', 'driver', 'phMoney', 'insuYn', 'bsMoney', 'contents'],
                data: [
                  { no: 1, driver: '강병선', phMoney: '100,000원', insuYn: '유', bsMoney: '20원', contents: '가' },
                  { no: 2, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 3, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 4, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 5, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 6, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 7, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 8, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 9, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 10, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 11, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' },
                  { no: 12, driver: '', phMoney: '0원', insuYn: '유', bsMoney: '0원', contents: '' }
                ]
              }
            },
            
            // 차량세 및 공과금
            {
              xtype: 'grid',
              title: '차량세 및 공과금',
              margin: '10 0',
              autoHeight: true,
              //height: 300,
              columns: [
                { text: '순번', dataIndex: 'no', width: 60 },
                { text: '날짜', dataIndex: 'regDate', flex: 1 },
                { text: '금액', dataIndex: 'money', flex: 1 },
                { text: '내용', dataIndex: 'contents', flex: 1 },
                { text: '비고', dataIndex: 'bigo', flex: 1 }
              ],
              store: {
                fields: ['no', 'regDate', 'money', 'contents', 'bigo'],
                data: [
                  { no: 1, regDate: '2025-04-23', money: '3,000원', contents: '더', bigo: '자' },
                  { no: 2, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 3, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 4, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 5, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 6, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 7, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 8, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 9, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 10, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 11, regDate: '', money: '0원', contents: '', bigo: '' },
                  { no: 12, regDate: '', money: '0원', contents: '', bigo: '' }
                ]
              }
            },
            
            // 차량 폐차 및 매각
            {
              xtype: 'grid',
              title: '차량매각/폐차 내역',
              autoHeight: true,
              margin: '10 0',
              columns: [
                {
                  text: '구분',
                  dataIndex: 'gubun',
                  flex: 1,
                  renderer: function (value) {
                    // 1 = 폐차, 0 = 매각
                    return value === '1' ? '폐차' : '매각';
                  }
                },
                { text: '일자', dataIndex: 'regDate', flex: 1 },
                { text: '사유', dataIndex: 'sayou', flex: 2 },
                { text: '방법', dataIndex: 'way', flex: 1 },
                { text: '금액', dataIndex: 'money', flex: 1 }
              ],
              store: {
                fields: ['gubun', 'regDate', 'sayou', 'way', 'money'],
                data: [
                  { gubun: '1', regDate: '', sayou: '12', way: '146', money: '456원' },
                  { gubun: '0', regDate: '', sayou: '', way: '', money: '0원' },
                  // 추가 데이터 예시
                  { gubun: '', regDate: '', sayou: '', way: '', money: '' }
                ]
              }
            }


          ]
        }
      ]
      
  });
  