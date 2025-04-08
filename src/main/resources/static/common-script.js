function loadProgram(menuId) {
    const contentPanel = Ext.ComponentQuery.query('#mainContentPanel')[0];
  
    // 예: WINA1003 → /app/view/wina/wina1003.js
    const lowerId = menuId.toLowerCase();
    const folder = lowerId.substring(0, 4); // wina
    const scriptPath = `/app/view/${folder}/${lowerId}.js`;
  
    // 컴포넌트 이름 예: DreamNalgae.view.wina.wina1003
    const className = `DreamNalgae.view.${folder}.${lowerId}`;

    contentPanel.removeAll(true);
    // 이미 정의된 경우에는 바로 생성
    if (Ext.ClassManager.isCreated(className)) {
      const cmp = Ext.create(className);
      contentPanel.add(cmp);
    } else {
      // 동적 로딩
      Ext.Loader.loadScript({
        url: scriptPath,
        onLoad: function () {
          try {
            const cmp = Ext.create(className);
            contentPanel.add(cmp);
          } catch (e) {
            console.error('컴포넌트 동적 생성 오류:', e);
            contentPanel.update(`
              <div style="padding:10px; color: red;">
                <h3>🚫 [${menuId}] 컴포넌트를 로드했지만 생성에 실패했습니다.</h3>
                <p><strong>${e.message}</strong></p>
                <p><strong>클래스이름 : ${className}</strong></p>
                <p><strong>파일위치 : ${scriptPath}</strong></p>
                <p>클래스 정의(Ext.define)가 정확한지 확인해주세요.</p>
              </div>
            `);
          }
        },
        onError: function () {
          contentPanel.update(`
            <div style="padding:10px;">
              <h3>🔒 ${menuId} 컴포넌트를 불러오지 못했습니다.</h3>
              <p>경로 또는 컴포넌트 정의를 확인해주세요.</p>
            </div>
          `);
        }
      });
    }
  }
  