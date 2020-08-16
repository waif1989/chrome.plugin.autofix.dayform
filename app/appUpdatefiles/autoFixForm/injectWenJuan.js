(function() {
  try {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);

    const form = {
      titleWenJuan: '',
      userName: '',
      userDepartment: '',
      userPhone: '',
      userLocation: '',
    };

    chrome.storage.sync.get(['titleWenJuan', 'userName', 'userDepartment', 'userPhone', 'userLocation'], function(res) {
      try {
        form.titleWenJuan = res.titleWenJuan || '';

        if (!form.titleWenJuan) {
          alert('请先点击“#到岗承诺书配置”进行配置后使用')
          return;
        }

        if (!/wj.qq.com\/s2\/5756860\/e2fe/gi.test(window.location.href)) {
          alert('请点击“#跳转到到岗承诺书页面”，进入页面后使用')
          return;
        }

        if (res.userName !== '') {
          const form1 = document.querySelectorAll('.question-body')[0].children[0];
          form1.value= res.userName;
          form1.dispatchEvent(evt);
        }
        if (res.userPhone !== '') {
          const form2 = document.querySelectorAll('.question-body')[2].children[0];
          form2.value= res.userPhone;
          form2.dispatchEvent(evt);
        }
        if (res.userLocation !== '') {
          const form3 = document.querySelectorAll('.question-body')[3].children[0];
          form3.value= res.userLocation;
          form3.dispatchEvent(evt);
        }
        if (res.userDepartment !== '') {
          setTimeout(() => {
            document.querySelectorAll('.select-list-li').forEach(item => {
              if (item.innerHTML === res.userDepartment) {
                item.click();
              }
            })
          }, 300)
        }
        document.querySelectorAll('.question-body')[4].querySelectorAll('.checkbox-option')[0].children[0].click(); // 用工方式
        document.querySelectorAll('.question-body')[6].querySelectorAll('.checkbox-option')[0].children[0].click(); // 本周个人情况是否符合公司《到岗上班承诺书》内容要求
      } catch (e) {}

    })

  } catch {}
})();

