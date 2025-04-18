Ext.define('DreamNalgae.view.osys.osys1007', {
    extend: 'Ext.panel.Panel',
    xtype: 'osys1007',
    layout: "border",
    controller: {
        
    },
    items:[
        // 1. 상단 검색 패널
        {
            region:'north',
            xtype:'form',
            bodyPadding:10,
            layout:'hbox',
            defaults:{xtype:'textfield',margin:'0 5 0 0',labelAlign:'right'},
            items:[
                { fieldLabel:'검색어', name:'searchText', width:300 },
                { xtype:'button', text:'조회', handler:'onSearch'},
                { xtype:'button', text:'초기화', handler:'onReset'},
                // 콤보박스 등 더 추가
            ]
        },

        // 2. 도서정보목록 그리드
        {
            region:'center',
            xtype:'grid',
            title:'도서정보목록',
            reference:'bookGrid',
            cls: 'small-title-panel',
            header: {
                titleAlign: 'left',
                items: [
                    {
                        xtype: 'button',
                        text: '바코드 인쇄',
                        iconCls: 'x-fa fa-print',
                        margin: '0 5 0 0'
                    },
                    {
                        xtype: 'combo',
                        width: 80,
                        store: ['좌기', '우기'],
                        value: '좌기'
                    },
                    {
                        xtype: 'numberfield',
                        width: 60,
                        value: 1,
                        minValue: 1,
                        hideTrigger: false
                    },
                    {
                        xtype: 'label',
                        html: '장 인쇄',
                        margin: '0 10 0 5'
                    },
                    {
                        xtype: 'button',
                        text: '저장',
                        margin: '0 5 0 10',
                        handler: function () {
                            Ext.Msg.alert('저장', '저장 버튼 클릭됨');
                        }
                    },
                    {
                        xtype: 'button',
                        text: '삭제',
                        handler: function () {
                            Ext.Msg.alert('삭제', '삭제 버튼 클릭됨');
                        }
                    }
                ]
            },
            store: {
                fields: [
                    'bookCode', 'bookName', 'publisherName', 'bookPrice',
                    'isbn', 'registerDate', 'stockQty', 'barcode'
                ],
                data: [
                    {
                        bookCode: 'B001',
                        bookName: '자바의 정석',
                        publisherName: '도우출판',
                        bookPrice: 30000,
                        isbn: '9788970501234',
                        registerDate: '2024-01-15',
                        stockQty: 10,
                        barcode: '8801234567890'
                    },
                    {
                        bookCode: 'B002',
                        bookName: '토비의 스프링',
                        publisherName: '에이콘출판',
                        bookPrice: 45000,
                        isbn: '9788960777330',
                        registerDate: '2023-11-20',
                        stockQty: 5,
                        barcode: '8802234567891'
                    },
                    {
                        bookCode: 'B003',
                        bookName: '클린코드',
                        publisherName: '인사이트',
                        bookPrice: 38000,
                        isbn: '9788966261207',
                        registerDate: '2022-09-05',
                        stockQty: 8,
                        barcode: '8803334567892'
                    }
                ]
            },
            columns:[
                { text: 'NO', xtype: 'rownumberer', width: 40 },
                { text: '도서코드', dataIndex: 'bookCode', flex: 1 },
                { text: '도서명', dataIndex: 'bookName', flex: 2 },
                { text: '출판사명', dataIndex: 'publisherName', flex: 1 },
                { text: '정가', dataIndex: 'bookPrice', width: 100 },
                { text: 'ISBN', dataIndex: 'isbn', width: 150 },
                { text: '등록일자', dataIndex: 'registerDate', width: 120 },
                { text: '수량', dataIndex: 'stockQty', width: 70 },
                { text: '바코드', dataIndex: 'barcode', width: 140 }
            ]
        },

        // 3. 하단 기본정보 + 자식코드 탭 패널
        {
            region: 'south',
            xtype: 'panel',
            height: 400,
            cls: 'small-title-panel',
            layout: 'border',   // 내부에서 다시 영역을 나눔
        
            items: [
                {
                    region: 'center',
                    xtype: 'form',
                    title: '기본정보',
                    layout: {
                        type: 'table',
                        columns: 5
                    },
                    bodyPadding: 10,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        margin: 5
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
                    region: 'south',
                    xtype: 'grid',
                    title: '자식 코드 리스트',
                    height: 180,
                    store: {
                        fields: ['childCode', 'childName', 'childEval'],
                        data: [
                            { childCode: 'B001-01', childName: '자바의 정석 (부록1)', childEval: '우수' },
                            { childCode: 'B001-02', childName: '자바의 정석 (부록2)', childEval: '보통' },
                            { childCode: 'B002-01', childName: '토비의 스프링 (연습문제)', childEval: '매우 우수' }
                        ]
                    },
                    columns: [
                        { text: '자식코드', dataIndex: 'childCode', flex: 1 },
                        { text: '도서명', dataIndex: 'childName', flex: 2 },
                        { text: '도서평가', dataIndex: 'childEval', flex: 1 }
                    ]
                }
            ]
        }
        
    ]
});