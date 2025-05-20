Ext.define('MyApp.view.BookUploadPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'bookuploadpanel',
    width: 400,
    bodyPadding: 10,
    items: [
        {
            xtype: 'filefield',
            name:'file',
            fieldLabel: '엑셀 파일',
            labelWidth: 80,
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            buttonText: '파일 선택 ...'
        }
    ],
    buttons:[
        {
            text: '업로드',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        url: '/api/books/upload-excel',
                        waitMsg: '업로드 중...',
                        success: function(fp, o) {
                            Ext.Msg.alert('성공', '파일이 업로드되었습니다.');
                        },
                        failure: function(fp,o){
                            Ext.Msg.alert('실패','업로드 중 오류가 발생했습니다.');
                        }
                    });
                }
            }

        }
    ]




});