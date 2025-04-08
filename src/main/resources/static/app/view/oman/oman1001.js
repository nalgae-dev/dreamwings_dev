Ext.define('DreamNalgae.view.oman.oman1001', {
    extend: 'Ext.panel.Panel',
    xtype: 'oman1002',
    layout: 'fit',

    items: [
        {
            xtype: 'grid',
            title: '사용자 목록(OMAN1001)',
            reference: 'userGrid',
            store: {
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/oman/list', // 백엔드 API 연동
                    reader: {
                        type: 'json'
                    }
                },
                fields: [
                    { name: 'userId' },
                    { name: 'userNm' },
                    { name: 'emailAddr' },
                    { name: 'telNo' },
                    { name: 'partCd' }
                ]
            },
            columns: [
                { text: '사용자 ID', dataIndex: 'userId', flex: 1 },
                { text: '이름', dataIndex: 'userNm', flex: 1.5 },
                { text: '이메일', dataIndex: 'emailAddr', flex: 2 },
                { text: '전화번호', dataIndex: 'telNo', flex: 1.5 },
                { text: '부서코드', dataIndex: 'partCd', flex: 1 }
            ]
        }
    ]
});
