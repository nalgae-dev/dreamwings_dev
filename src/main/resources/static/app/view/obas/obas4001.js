Ext.define('DreamNalgae.view.obas.obas4001', {
    extend: 'Ext.panel.Panel',
    xtype: 'obas4001',
    layout: 'border',
    controller: {
      onUpdateOil:function (btn) {
        const grid = btn.up('grid');
        const store = grid.getStore();

        const oilData = [];

        store.each(function (record) {
          // 홀수월 추가
          oilData.push({
            month: parseInt(record.get('oddMonth')) || 0,
            litter: parseInt(record.get('oddLitter')) || 0,
            money: parseInt(record.get('oddMoney')) || 0
          });
    
          // 짝수월 추가
          oilData.push({
            month: parseInt(record.get('evenMonth')) || 0,
            litter: parseInt(record.get('evenLitter')) || 0,
            money: parseInt(record.get('evenMoney')) || 0
          });
        });
    
        // 월이 0인 경우(예: evenMonth 없을 때) 제거
        const filteredOilData = oilData.filter(item => item.month !== 0);
    
        console.log('보낼 oilData:', filteredOilData);

        Ext.Ajax.request({
          url:'/obas/oil/update',
          method:'POST',
          jsonData:{ 
            centerCd:"C001", 
            carCd:"CAR003",
            oilYear:2025,
            OilData:filteredOilData
          },
          success:function(response) {
            Ext.Msg.alert('성공','수정이 완료되었습니다.');
          },
          failure:function(response){
            Ext.Msg.alert('오류','수정에 실패했습니다.');
          }
        });

      },

      // 그리드 선택시 선택된 차량 정보 불러오기
      onCarGridItemClick:function(grid,record){
        const view = this.getView();
        const carCd = record.get("carCd");
        const centerCd = record.get("centerCd");

        if (!carCd) return;

        // 선택된 차량 centerCd, carCd를 해당 뷰에 전역변수로 저장
        view.selectedCenterCd = centerCd;
        view.selectedCarCd = carCd;

        Ext.Ajax.request({
          url: '/obas/car/detail?carCd=' + encodeURIComponent(carCd),
          method: 'GET',
          success: function (response) {
            const data = Ext.decode(response.responseText);

            // 차량 기본정보
            const carForm = view.lookupReference('carInfoForm');
            if (carForm && data.carInfo) {
              carForm.getForm().setValues(data.carInfo);
            }


            // 주유내역 폼(oilForm) 채우기
            const oilForm = view.lookupReference('oilForm');
            if (oilForm && data.oilData) {

              const values = {};
              // 1월 ~ 12월 반복
              for (let i = 1; i <= 12; i++) {
                values[`oilLitter${i}`] = data.oilData[`oilLitter${i}`] != null ? data.oilData[`oilLitter${i}`] : 0;
                values[`oilMoney${i}`] = data.oilData[`oilMoney${i}`] != null ? data.oilData[`oilMoney${i}`] : 0;
              }

              oilForm.getForm().setValues(values);
            } else {
              oilForm.reset();
            }

            const repairForm = view.lookupReference('repairForm');
            if (repairForm && data.repairData) {
              const repairValues = {};

              for (let i = 1; i <= 12; i++) {
                repairValues[`repairRegDt${i}`] = data.repairData[`repairRegDt${i}`] || '';
                repairValues[`repairDriver${i}`] = data.repairData[`repairDriver${i}`] || '';
                repairValues[`repairSuri${i}`] = data.repairData[`repairSuri${i}`] || '';
                repairValues[`repairDistance${i}`] = data.repairData[`repairDistance${i}`] || '';
                repairValues[`repairMoney${i}`] = data.repairData[`repairMoney${i}`] || '';
                repairValues[`repairBigo${i}`] = data.repairData[`repairBigo${i}`] || '';
              }

              repairForm.getForm().setValues(repairValues);
            } else {
              repairForm.reset();
            }

            const accidentForm = view.lookupReference('accidentForm');
            if (accidentForm && data.accidentData) {
              const values = {};
            
              for (let i = 1; i <= 12; i++) {
                values[`carsagoDriver${i}`] = data.accidentData[`carsagoDriver${i}`] || '';
                values[`carsagoPhMoney${i}`] = data.accidentData[`carsagoPhMoney${i}`] || '';
                values[`carsagoInsuGu${i}`] = data.accidentData[`carsagoInsuGu${i}`] || '';
                values[`carsagoBsMoney${i}`] = data.accidentData[`carsagoBsMoney${i}`] || '';
              }
            
              accidentForm.getForm().setValues(values);
            } else if (accidentForm) {
              accidentForm.getForm().reset();
            }

            const taxForm = view.lookupReference('taxForm');
            if (taxForm && data.taxData) {
              const values = {};
            
              for (let i = 1; i <= 12; i++) {
                values[`taxRegDt${i}`] = data.taxData[`taxRegDt${i}`] || '';
                values[`taxMoney${i}`] = data.taxData[`taxMoney${i}`] || '';
                values[`taxContents${i}`] = data.taxData[`taxContents${i}`] || '';
                values[`taxBigo${i}`] = data.taxData[`taxBigo${i}`] || '';
              }
            
              taxForm.getForm().setValues(values);
            } else {
              taxForm.getForm().reset();
            }
          },
          failure: function () {
            Ext.Msg.alert('오류', '차량 정보를 불러오는데 실패했습니다.');
          }
        });
      },

      // 차량 수리 내역 저장
      onSaveRepair: function(btn) {
        const view = this.getView();
        const form = view.lookupReference('repairForm');

        if (!form.isValid()) {
          Ext.Msg.alert('오류', '입력값을 확인해주세요.');
          return;
        }

        const values = form.getValues();
        const payload = {
          id:{
            centerCd: view.selectedCenterCd, // 차량선택시 저장
            carCd: view.selectedCarCd,
            repairYear: new Date().getFullYear().toString()
          },
          ...values
        };

        Ext.Ajax.request({
          url: '/obas/repair/update',
          method: 'POST',
          jsonData: payload,
          success: function () {
            Ext.Msg.alert('성공', '수리내역이 저장되었습니다.');
          },
          failure: function () {
            Ext.Msg.alert('오류', '수리내역 저장 실패');
          }
        });
      },


      // 주유 내역 저장
      onSaveOil: function(btn) {
        const view = this.getView();
        const form = view.lookupReference('oilForm');

        if (!form.isValid) {
          Ext.Msg.alert('오류', '입력값을 확인해주세요.');
          return;
        }

        const values = form.getValues();
        
        const payload = {
          id: {
            centerCd: view.selectedCenterCd,
            carCd: view.selectedCarCd,
            oilYear: new Date().getFullYear().toString()
          },
          ...values // 월별 주유량, 금액 입력값 다 추가
        };
      
        Ext.Ajax.request({
          url: '/obas/oil/save',
          method: 'POST',
          jsonData: payload,
          success: function() {
            Ext.Msg.alert('성공', '주유내역이 저장되었습니다.');
          },
          failure: function() {
            Ext.Msg.alert('오류', '주유내역 저장 실패');
          }
        });
      },

      // 차량 세금 내역 저장
      onSaveTax:function(btn) {
        const view = this.getView();
        const form = view.lookupReference('taxForm');

        if (!form.isValid()) {
          Ext.Msg.alert('오류', '입력값을 확인해주세요.');
          return;
        }

        const values = form.getValues();

        const payload = {
          id:{
            centerCd: view.selectedCenterCd,
            carCd: view.selectedCarCd,
            taxYear: new Date().getFullYear().toString()
          },
          insertId: 'admin',
          updatedId: 'admin',
          ...values
        };

        Ext.Ajax.request({
          url: '/obas/tax/save',
          method: 'POST',
          jsonData: payload,
          success: function() {
            Ext.Msg.alert('성공', '차량세가 저장되었습니다.');
          },
          failure: function() {
            Ext.Msg.alert('오류', '차량세 저장에 실패했습니다.');
          }
        });

      },

      // 차량 사고내역 저장
      onSaveAccident: function(btn) {
        const view = this.getView();
        const form = view.lookupReference('accidentForm');

        if (!form.isValid()) {
          Ext.Msg.alert('오류', '입력값을 확인해주세요.');
          return;
        }

        const values = form.getValues();

        const payload = {
          id:{
            centerCd:view.selectedCenterCd,
            carCd:view.selectedCarCd,
            carsagoYear: new Date().getFullYear().toString()
          },
          insertId: 'admin',
          updateId: 'admin',
          ...values
        }

        Ext.Ajax.request({
          url:'/obas/accident/save',
          method: 'POST',
          jsonData: payload,
          success: function() {
            Ext.Msg.alert('성공', '사고현황이 저장되었습니다.');
          },
          failure: function() {
            Ext.Msg.alert('오류', '사고현황 저장 실패');
          }
        });

      },

      onSaveSell: function(btn) {
        

      }


      



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
            fields: ['centerCd','carCd','carRegnum', 'repairDriver', 'carNm'],
            proxy: {
              type: 'ajax',
              url:'/obas/carlist',
              reader: { type: 'json'}
            }
          },
          listeners: {
            itemclick: 'onCarGridItemClick'
          },
          columns: [
            { text: '센터코드', dataIndex: 'centerCd', hidden: true },
            { text: '차량코드', dataIndex: 'carCd', hidden: true },
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
                  reference: 'carInfoForm',
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
              xtype: 'form',
              reference: 'oilForm',
              title: '주유내역',
              autoHeight: true,
              margin: '10 0',
              layout: {
                type: 'table',
                columns: 6 // 🛑 6칸: 월/리터/금액 × 2세트(홀수/짝수)
              },
              defaults: {
                xtype: 'textfield',
                width: 120,
                margin: '5 5 0 0',
                labelAlign: 'top'
              },
              items: [
                // 🧩 헤더
                { xtype: 'displayfield', value: '월', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '주유량', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '월', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '주유량', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '금액', fieldStyle: 'text-align:center;font-weight:bold;' },
            
                // 🧩 1월 ~ 12월 나란히
                ...Array.from({ length: 6 }, (_, idx) => {
                  const oddMonth = idx * 2 + 1;  // 홀수 (1,3,5,7,9,11)
                  const evenMonth = idx * 2 + 2; // 짝수 (2,4,6,8,10,12)
            
                  return [
                    { xtype: 'displayfield', value: `${oddMonth}월`, width: 50, fieldStyle: 'text-align:center;' },
                    { name: `oilLitter${oddMonth}` },
                    { name: `oilMoney${oddMonth}` },
                    { xtype: 'displayfield', value: `${evenMonth}월`, width: 50, fieldStyle: 'text-align:center;' },
                    { name: `oilLitter${evenMonth}` },
                    { name: `oilMoney${evenMonth}` }
                  ];
                }).flat()
              ],
              buttons: [
                '->',
                {
                  text: '주유내역 저장',
                  iconCls: 'x-fa fa-save',
                  handler: 'onSaveOil' // 🚀 저장용 핸들러
                }
              ]
            },
            
            
            
            // 차량 수리 내역
            {
              xtype: 'form',
              reference: 'repairForm',
              title: '차량수리내역',
              margin: '10 0',
              autoHeight: true,
              // tbar: [
              //   '->',
              //   {
              //     xtype: 'button',
              //     text: '수정',
              //     iconCls: 'x-fa fa-save',
              //     handler: 'onSaveRepair'
              //   }
              // ],
              layout: {
                type: 'table',
                columns: 7
              },
              defaults: {
                xtype: 'textfield',
                width: 140,
                margin: '5 5 0 0',
                labelAlign: 'top'
              },
            
              items: [
                // 🧩 헤더
                { xtype: 'displayfield', value: '월', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '일자', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '운전자', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '수리내역', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '운행거리', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '비고', fieldStyle: 'text-align:center;font-weight:bold;', flex:1 },
            
                // 🧩 1월 ~ 12월 입력 칸 반복 생성
                ...Array.from({ length: 12 }, (_, idx) => {
                  const month = idx + 1;
                  return [
                    { xtype: 'displayfield', value: `${month}월`, width: 50, fieldStyle: 'text-align:center;' },
                    { name: `repairRegDt${month}` },
                    { name: `repairDriver${month}` },
                    { name: `repairSuri${month}` },
                    { name: `repairDistance${month}` },
                    { name: `repairMoney${month}` },
                    { name: `repairBigo${month}` }
                  ];
                }).flat()
              ],
            
              buttons: [
                '->',
                {
                  text: '수리내역 저장',
                  iconCls: 'x-fa fa-save',
                  handler: 'onSaveRepair'
                }
              ]
            },
            


            // 차량 사고 현황
            {
              xtype: 'form',
              reference: 'accidentForm',
              title: '차량사고현황',
              margin: '10 0',
              autoHeight: true,
              layout: {
                type: 'table',
                columns: 5
              },
              defaults: {
                xtype: 'textfield',
                width: 150,
                margin: '5 5 0 0',
                labelAlign: 'top'
              },
              items: [
                // 🧩 헤더 라인
                { xtype: 'displayfield', value: '월', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '운전자', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '피해금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '보험처리', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '보상금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                
                // 🧩 1월 ~ 12월 반복 생성
                ...Array.from({ length: 12 }, (_, idx) => {
                  const month = idx + 1;
                  return [
                    { xtype: 'displayfield', value: `${month}월`, width: 50, fieldStyle: 'text-align:center;' },
                    { name: `carsagoDriver${month}` },
                    { name: `carsagoPhMoney${month}` },
                    { name: `carsagoInsuGu${month}` },
                    { name: `carsagoBsMoney${month}` }
                  ];
                }).flat()
              ],
              
              buttons: [
                '->',
                {
                  text: '사고현황 저장',
                  iconCls: 'x-fa fa-save',
                  handler: 'onSaveAccident'  // ▶️ 사고 저장 핸들러 연결
                }
              ]
            },
            
            
            // 차량세 및 공과금
            {
              xtype: 'form',
              reference: 'taxForm',
              title: '차량세 및 공과금',
              margin: '10 0',
              autoHeight: true,
              layout: {
                type: 'table',
                columns: 5
              },
              defaults: {
                xtype: 'textfield',
                width: 150,
                margin: '5 5 0 0',
                labelAlign: 'top'
              },
              items: [
                // 🧩 헤더 라인
                { xtype: 'displayfield', value: '월', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '일자', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '내용', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '비고', fieldStyle: 'text-align:center;font-weight:bold;' },
            
                // 🧩 1월 ~ 12월 반복
                ...Array.from({ length: 12 }, (_, idx) => {
                  const month = idx + 1;
                  return [
                    { xtype: 'displayfield', value: `${month}월`, width: 50, fieldStyle: 'text-align:center;' },
                    { name: `taxRegDt${month}` },
                    { name: `taxMoney${month}` },
                    { name: `taxContents${month}` },
                    { name: `taxBigo${month}` }
                  ];
                }).flat()
              ],
            
              buttons: [
                '->',
                {
                  text: '차량세 저장',
                  iconCls: 'x-fa fa-save',
                  handler: 'onSaveTax'
                }
              ]
            },
            
            
            // 차량 폐차 및 매각
            {
              xtype: 'form',
              reference:'sellForm',
              title: '차량매각/폐차 내역',
              autoHeight: true,
              margin: '10 0',
              layout: {
                type: 'table',
                columns: 5
              },
              defaults: {
                xtype: 'textfield',
                width: 150,
                margin: '5 5 0 0',
                labelAlign: 'top'
              },
              items: [
                // 헤더
                { xtype: 'displayfield', value: '구분', fieldStyle: 'text-align:center;font-weight:bold;', width: 50 },
                { xtype: 'displayfield', value: '일자', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '사유', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '방법', fieldStyle: 'text-align:center;font-weight:bold;' },
                { xtype: 'displayfield', value: '금액', fieldStyle: 'text-align:center;font-weight:bold;' },
                
                // 첫번째 줄
                { xtype: 'displayfield', value: '매각', fieldStyle: 'text-align:center;font-weight:bold;', width: 50},
                { name : `SELL_REG_DT1`},
                { name : `SELL_SAYOU1`},
                { name : `SELL_WAY1`},
                { name : `SELL_MONEY1`},

                //두번째 줄
                { xtype: 'displayfield', value: '폐차', fieldStyle: 'text-align:center;font-weight:bold;', width: 50},
                { name : `SELL_REG_DT2`},
                { name : `SELL_SAYOU2`},
                { name : `SELL_WAY2`},
                { name : `SELL_MONEY2`},
              ],
              buttons: [
                '->',
                {
                  text: '매각/폐차 내역 저장',
                  iconCls: 'x-fa fa-save',
                  handler: 'onSaveSell'
                }
              ]
            }

          ]
        }
      ]
      
  });
  