Ext.define('DreamNalgae.view.osys.osys1002', {
    extend: 'Ext.panel.Panel',
    xtype: 'osys1002',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    controller: {
        onMenuSelect: function (tree, record) {
            var form = this.getView().lookupReference('menuForm');
            if (form) {
                form.getForm().setValues(record.data);
            } else {
                console.warn('menuForm 참조를 찾을 수 없습니다.');
            }
        },

        onAddMenu: function (btn) {
            var tree = btn.up('panel').down('treepanel[reference=menuTree]');
            var selected = tree.getSelection()[0];

            var newNode = {
                menuId: '',
                menuNm: '',
                menuLevel: selected ? selected.get('menuLevel') + 1 : 0,
                parentMenuId: selected ? selected.get('menuId') : '',
                pgmYn: '0',
                execType: '',
                execUrl: '',
                userYn: '1'
            };

            var form = tree.up('panel').down('form[reference=menuForm]');
            form.getForm().reset();
            form.getForm().setValues(newNode);
        },

        onDeleteMenu: function (btn) {
            var tree = btn.up('panel').down('treepanel[reference=menuTree]');
            var selected = tree.getSelection()[0];
            if (!selected) return;

            Ext.Msg.confirm('삭제 확인', '선택한 메뉴를 삭제하시겠습니까?', function (btnText) {
                if (btnText === 'yes') {
                    Ext.Ajax.request({
                        url: 'api/menu/' + selected.get('menuId'),
                        method: 'DELETE',
                        success: function () {
                            tree.getStore().load();
                            Ext.toast('삭제 완료');
                        }
                    });
                }
            });
        },

        onSaveMenu: function (btn) {
            var form = btn.up('form');
            var values = form.getValues();

            Ext.Ajax.request({
                url: '/api/menu',
                method: 'POST',
                jsonData: values,
                success: function () {
                    Ext.toast('저장 완료');
                    var tree = form.up('panel').down('treepanel[reference=menuTree]');
                    tree.getStore().load();
                }
            });
        },

        onChangeParent: function (btn) {
            Ext.Msg.prompt('상위 메뉴 변경', '새로운 상위 메뉴 ID를 입력하세요', function (btnText, text) {
                if (btnText === 'yes') {
                    var form = btn.up('form');
                    form.getForm().findField('parentMenuId').setValue(text);
                }
            });
        },

        onTreeDrop: function () {
            // drag-drop 후 처리할 로직 필요시 작성
        }
    },

    items: [
        {
            xtype: 'treepanel',
            title: '메뉴 목록(OSYS1002)',
            reference: 'menuTree',
            rootVisible: false,
            flex: 1,
            scrollable: true,
            displayField: 'menuNm',
            enableDrag: true,
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    allowParentInsert: true,
                    allowLeafInserts: true
                }
            },
            store: {
                type: 'tree',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url: '/api/menu/tree',
                    reader: {
                        type: 'json'
                    }
                },
                listeners: {
                    load: function (store) {
                        const rootNode = store.getRoot();

                        // 2뎁스까지만 펼치기
                        const expandDepth = function (node, level) {
                            if (level < 2) {
                                node.expand(false, function () {
                                    node.eachChild(function (child) {
                                        expandDepth(child, level + 1);
                                    });
                                });
                            }
                        };
                        expandDepth(rootNode, 0);
                    }
                }
            },
            listeners: {
                select: 'onMenuSelect',
                drop: 'onTreeDrop'
            },
            tbar: [
                { text: '추가', handler: 'onAddMenu' },
                { text: '삭제', handler: 'onDeleteMenu' }
            ]
        },
        {
            xtype: 'form',
            reference: 'menuForm',
            title: '메뉴 정보',
            width: 350,
            bodyPadding: 10,
            defaults: {
                anchor: '100%',
                labelWidth: 100
            },
            items: [
                { xtype: 'textfield', name: 'menuId', fieldLabel: '메뉴 ID', readOnly: true },
                { xtype: 'textfield', name: 'menuNm', fieldLabel: '메뉴명' },
                { xtype: 'numberfield', name: 'menuLevel', fieldLabel: '메뉴레벨' },
                { xtype: 'textfield', name: 'parentMenuId', fieldLabel: '상위메뉴' },
                { xtype: 'textfield', name: 'pgmYn', fieldLabel: '프로그램여부' },
                { xtype: 'textfield', name: 'execType', fieldLabel: '실행형태' },
                { xtype: 'textfield', name: 'execUrl', fieldLabel: '실행경로' },
                { xtype: 'textfield', name: 'userYn', fieldLabel: '사용여부' }
            ],
            buttons: [
                { text: '이동', handler: 'onChangeParent' },
                { text: '저장', formBind: true, handler: 'onSaveMenu' }
            ]
        }
    ]
});
