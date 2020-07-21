try {
  (function f() {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);

    chrome.storage.local.get(['injectPhoneCode'], function (res) {
      if (res.injectPhoneCode) {
        eval(res.injectPhoneCode)
        return;
      }

      const form = {
        titlePhone: '',
        phone: '',
      };

      chrome.storage.sync.get(['titlePhone', 'phone'], function(res) {
        try {
          form.titlePhone = res.titlePhone || '';
          if (!form.titlePhone) {
            alert('请先点击“配置手机号码信息”进行配置后使用')
            return;
          }

          if (!/xc.caict.ac.cn\/\#\/login/gi.test(window.location.href)) {
            alert('请点击“#跳转到行程卡页面”，进入页面后使用')
            return;
          }

          if (res.phone !== '') {
            const form1 =  document.querySelectorAll('.form-item')[0].children[1]
            form1.value = res.phone;
            form1.dispatchEvent(evt);

            setTimeout(() => {
              document.querySelectorAll('.form-item')[0].children[3].click();
            }, 500);
          }

          document.querySelectorAll('.form-item')[2].children[0].children[0].click();


        } catch (e) {}
      })
    });


  })()
} catch (e) {}
