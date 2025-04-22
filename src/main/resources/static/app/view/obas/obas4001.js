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
          reference: 'bookGrid',  // 참조용 id 설정 (선택 사항)
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
                const value = grid.down('#searchField').getValue().toLowerCase();
                const store = grid.getStore();
                store.clearFilter();
                if (value) {
                  store.filterBy(record => {
                    return record.get('title').toLowerCase().includes(value);
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
            fields: ['bookId', 'title', 'author', 'quantity'],
            data: [
              { bookId: 'B001', title: '자바의 정석', author: '남궁성', quantity: 10 },
              { bookId: 'B002', title: '스프링 인 액션', author: '크레이그 월즈', quantity: 5 },
              { bookId: 'B003', title: '클린 코드', author: '로버트 마틴', quantity: 7 }
            ]
          },
          columns: [
            { text: '도서 ID', dataIndex: 'bookId', flex: 1 },
            { text: '제목', dataIndex: 'title', flex: 2 },
            { text: '저자', dataIndex: 'author', flex: 2 },
            { text: '수량', dataIndex: 'quantity', flex: 1 }
          ]
        },
        {
          region: 'center',
          xtype: 'panel',
          layout: 'hbox',
          items:[
            
          ]
        }
      ]
      
  });
  