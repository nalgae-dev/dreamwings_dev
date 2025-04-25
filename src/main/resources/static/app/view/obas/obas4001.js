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
            {
                xtype: 'form',
                title: '차량량기본정보',
                layout: {
                    type: 'table',
                    columns: 5
                },
                defaults: {
                    xtype: 'textfield',
                    width: 180,
                    margin: '5 10'
                },
                items: [
                    { fieldLabel: '도서코드', name: 'bookCode' },
                    { fieldLabel: '도서명', name: 'bookName' },
                    { fieldLabel: '출판사', name: 'publisher' },
                    { fieldLabel: '저자명', name: 'author' },
                    { fieldLabel: '도서코드', name: 'bookCode' },
                    { fieldLabel: '도서명', name: 'bookName' },
                    { fieldLabel: '출판사', name: 'publisher' },
                    { fieldLabel: '저자명', name: 'author' },
                    { fieldLabel: '도서코드', name: 'bookCode' },
                    { fieldLabel: '도서명', name: 'bookName' },
                    { fieldLabel: '출판사', name: 'publisher' },
                    { fieldLabel: '저자명', name: 'author' },
                    { fieldLabel: '도서코드', name: 'bookCode' },
                    { fieldLabel: '도서명', name: 'bookName' },
                    { fieldLabel: '출판사', name: 'publisher' },
                    { fieldLabel: '저자명', name: 'author' },
                    { fieldLabel: '도서코드', name: 'bookCode' },
                    { fieldLabel: '도서명', name: 'bookName' },
                    { fieldLabel: '출판사', name: 'publisher' },
                    { fieldLabel: '저자명', name: 'author' },
                ]
            },
            {
                xtype: 'form',
                reference: 'userForm',
                title: '사용자 상세정보',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 100
                },
                items: [
                    { xtype: 'textfield', name: 'userId', fieldLabel: '사용자 ID', readOnly: true },
                    { xtype: 'textfield', name: 'userNm', fieldLabel: '이름' },
                    { xtype: 'textfield', name: 'emailAddr', fieldLabel: '이메일' },
                    { xtype: 'textfield', name: 'telNo', fieldLabel: '전화번호' },
                    { xtype: 'textfield', name: 'partCd', fieldLabel: '부서코드' },
                    { xtype: 'textfield', name: 'posiNm', fieldLabel: '직급' }
                ]
            },
            {
              xtype: 'form',
              reference: 'basicInfo',
              bodyPadding: 10,
              title: '차량 주유내역',
              items:[   
                { xtype: 'textfield', name: '', fieldLabel: '정보1', readOnly: true },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' },
                { xtype: 'textfield', name: '', fieldLabel: '정보1' }
              ]
            }
          ]
        }
      ]
      
  });
  