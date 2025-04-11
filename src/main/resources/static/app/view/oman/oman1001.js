Ext.define('DreamNalgae.view.oman.oman1001', {
    extend: 'Ext.panel.Panel',
    xtype: 'oman1002',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: {
        onSearch: function () {
            const view = this.getView();
            const nameField = view.lookupReference('userNmField');
            const posiCombo = view.lookupReference('posiCombo');
            const store = view.lookupReference('userGrid').getStore();

            store.load({
                params: {
                    userNm: nameField.getValue(),
                    posiNm: posiCombo.getValue()
                }
            });
        },

        onUserSelect: function (grid, record) {
            const form = this.getView().lookupReference('userForm');
            if (form) {
                form.getForm().setValues(record.data);
            }
        }
    },

    items: [
        {
            xtype: 'toolbar',
            padding: '5 10',
            items: [
                { xtype: 'textfield', fieldLabel: '이름', reference: 'userNmField', labelWidth: 40 },
                { 
                    xtype: 'combo',
                    fieldLabel: '직급',
                    reference: 'posiCombo',
                    labelWidth: 40,
                    store: ['사원', '대리', '과장', '차장', '부장'], // 백엔드 연동 가능
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false
                },
                { xtype: 'button', text: '검색', handler: 'onSearch' }
            ]
        },
        {
            xtype: 'grid',
            title: '사용자 목록(OMAN1001)',
            reference: 'userGrid',
            flex: 1,
            store: {
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/oman/list',
                    reader: { type: 'json' }
                },
                fields: [
                    'userId', 'userNm', 'emailAddr', 'telNo', 'partCd', 'posiNm'
                ]
            },
            columns: [
                { text: '사용자 ID', dataIndex: 'userId', flex: 1 },
                { text: '이름', dataIndex: 'userNm', flex: 1.5 },
                { text: '이메일', dataIndex: 'emailAddr', flex: 2 },
                { text: '전화번호', dataIndex: 'telNo', flex: 1.5 },
                { text: '부서코드', dataIndex: 'partCd', flex: 1 },
                { text: '직급', dataIndex: 'posiNm', flex: 1 }
            ],
            listeners: {
                select: 'onUserSelect'
            }
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
        }
    ]
});
