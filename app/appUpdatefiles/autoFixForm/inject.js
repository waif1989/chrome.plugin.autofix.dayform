try {
  chrome.storage.local.get(['injectCode'], function (res) {
    if (res.injectCode) {
      eval(res.injectCode)
      return;
    }

    const form = {
      title: '',
      name: '',
      department: '',
      location: '',
      position: '',
    };

    chrome.storage.sync.get(['title', 'name', 'department', 'location', 'position'], function(res) {
      try {
        form.title = res.title || '';
        form.name = res.name || '';
        form.department = res.department || '';
        form.location = res.location || '';
        form.position = res.position || '';

        if (!form.title) {
          alert('请先点击“#协同配置”进行配置后使用')
          return;
        }

        if (!/center.bgzs.site/gi.test(window.location.origin)) {
          alert('请点击“#跳转到办公申请页面”，进入页面后使用')
          return;
        }

        let d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000);
        let year = d.getFullYear();
        let month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
        let day = d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`;

        if (form.department !== '') {
          document.querySelectorAll('.radiolistwrap')[0].children[~~form.department].children[0].click(); // 部门
        }
        document.querySelectorAll('.radiolistwrap')[1].children[0].children[0].click(); // 用工方式
        document.querySelectorAll('.radiolistwrap')[2].children[0].children[0].click(); // 是否符合到场要求

        if (form.location !== '') {
          document.querySelectorAll('.radiolistwrap')[3].children[~~form.location].children[0].click(); // 具体办公地点
        }
        if (form.position !== '') {
          document.querySelectorAll('.radiolistwrap')[4].children[~~form.position].children[0].click(); // 楼层
        }
        document.querySelectorAll('.radiolistwrap')[5].children[0].children[0].click(); // 是否阅知并签订线上承诺书
        document.querySelectorAll('.form-control')[0].value = `${year}-${month}-${day}`; // 进场时间
        document.querySelectorAll('.form-control')[1].value = form.name; // 组长姓名
      } catch {}
    });
  });
} catch {}
