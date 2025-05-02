Ext.define('DreamNalgae.view.common.UserSearchWindow',{
    extend: 'Ext.window.Window',
    xtype: 'usersearchwindow',
    title: '사용자 검색',
    modal: true,
    width: 600,
    height: 400,
    layout: 'fit',
    items:[
        {
            xtype: 'grid',
            reference: 'userGrid',
            store: {
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/oman/list',
                    reader : { type:'json'}
                },
                fields: ['userId','userNm']
            },
            columns: [
                { text:'ID', dataIndex:'userId', width:100 },
                { text:'이름', dataIndex:'userNm', flex:1 }
            ],
            listeners: {
                itemdblclick: function (grid, record) {
                    const win = grid.up('window');
                    win.fireEvent('userselected', record);
                    win.close();
                }
            }
        }
    ]
});