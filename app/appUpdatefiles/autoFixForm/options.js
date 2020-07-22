  function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    };
    return null;
  }

  function initXingcheng() {
    const form = {
      titlePhone: '',
      phone: '',
    };

    chrome.storage.sync.get(['titlePhone', 'phone'], function(res) {
      try {
        form.titlePhone = res.titlePhone || '';
        form.phone = res.phone || '';

        if (form.phone !== '') {
          $('#phoneNum').val(form.phone);
        }
      } catch {}
    })

    $('#updatePhoneClear').click(function() {
      Object.keys(form).map(function(key) {
        chrome.storage.sync.remove(key);
      })
      alert('清除成功');
      window.location.reload();
    })

    $('#updatePhoneInfo').click(function () {
      if ($('#phoneNum').val() === '') {
        alert('请输入电话号码');
        return;
      }
      form.titlePhone = '点我:自动填充行程卡';
      form.phone = $('#phoneNum').val();

      chrome.storage.sync.set(form, function() {
        alert('更新成功，请重新点击该插件图标');
        console.log('form set!');
      })
    })
  }

  function initXieTong() {
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

        // $('#pluginsTitle').val(form.title);
        $('#leaderName').val(form.name);
        if (form.department !== '') {
          $('.radioDepartment')[~~form.department].click();
        }
        if (form.location !== '') {
          $('.radioLocation')[~~form.location].click();
        }
        if (form.position !== '') {
          $('.radioPosition')[~~form.position].click();
        }
      } catch {}
    })

    $('.radioDepartment').click(function() {
      form.department = this.value + '';
    })

    $('.radioLocation').click(function() {
      form.location = this.value + '';
    })

    $('.radioPosition').click(function() {
      form.position = this.value + '';
    })

    $('#updatePluginClear').click(function() {
      Object.keys(form).map(function(key) {
        chrome.storage.sync.remove(key);
      })
      alert('清除成功');
      window.location.reload();
    })

    $('#updatePluginInfo').click(function() {
      if (form.department === '') {
        alert('请选择部门');
        return;
      }
      if (form.location === '') {
        alert('请选择办公地点');
        return;
      }
      if (form.position === '') {
        alert('请选择办公楼层');
        return;
      }
      if ( $('#leaderName').val() === '') {
        alert('填写组长名');
        return;
      } else {
        form.name = $('#leaderName').val();
      }

      form.title = '点我:自动填充协同申请表';
      // if ($('#pluginsTitle').val() === '') {
      //   form.title = `协同自动填表:研发二部`
      // } else {
      //   const title = $('#pluginsTitle').val();
      //   form.title = `协同:${title}`
      // }
      chrome.storage.sync.set(form, function() {
        // window.localStorage.setItem('form', JSON.stringify(form));
        alert('更新成功，请重新点击该插件图标');
        console.log('form set!');
      })
    })
  }

  function initWenJuan() {
    const form = {
      titleWenJuan: '',
      userName: '',
      userDepartment: '',
      userPhone: '',
      userLocation: '',
    };

    chrome.storage.sync.get(['userName', 'userDepartment', 'userPhone', 'userLocation'], function(res) {
      try {
        form.userName = res.userName || '';
        form.userDepartment = res.userDepartment || '';
        form.userPhone = res.userPhone || '';
        form.userLocation = res.userLocation || '';

        if (form.userName !== '') {
          $('#userName').val(form.userName);
        }
        if (form.userDepartment !== '') {
          $('#userDepartment').val(form.userDepartment)
          $("#userDepartmentSelect").val(form.userDepartment);
        }
        if (form.userPhone !== '') {
          $('#userPhone').val(form.userPhone)
        }
        if (form.userLocation !== '') {
          $('#userLocation').val(form.userLocation)
        }
      } catch {}
    })

    $('#userDepartmentSelect').change(function () {
      $('#userDepartment').val($(this).children('option:selected').val());
    })

    $('#updateWenJuanClear').click(function() {
      Object.keys(form).map(function(key) {
        chrome.storage.sync.remove(key);
      })
      alert('清除成功');
      window.location.reload();
    })

    $('#updateWenJuanInfo').click(function() {
      form.userName = $('#userName').val();
      form.userDepartment = $('#userDepartment').val();
      form.userPhone = $('#userPhone').val();
      form.userLocation = $('#userLocation').val();

      if (form.userName === '') {
        alert('请填写你的名字');
        return;
      }
      if (form.userDepartment === '') {
        alert('请填写你的部门');
        return;
      }
      if (form.userPhone === '') {
        alert('请填写你的手机号码');
        return;
      }
      if (form.userLocation === '') {
        alert('请填写你的办公地址');
        return;
      }
      form.titleWenJuan = '点我:自动填充承诺书申请表'

      chrome.storage.sync.set(form, function() {
        alert('更新成功，请重新点击该插件图标');
        console.log('form set!');
      })
    })

  }

  if (getQueryString('configForm') === 'xietong') {
    $('#formXingcheng').css('display', 'none');
    $('#formXietong').css('display', 'block');
    $('#formWenJuan').css('display', 'none');
    initXieTong();
  } else if (getQueryString('configForm') === 'wenjuan') {
    $('#formXingcheng').css('display', 'none');
    $('#formXietong').css('display', 'none');
    $('#formWenJuan').css('display', 'block');
    initWenJuan();
  } else if (getQueryString('configForm') === 'xingcheng') {
    $('#formXingcheng').css('display', 'block');
    $('#formXietong').css('display', 'none');
    $('#formWenJuan').css('display', 'none');
    initXingcheng();
  } else {
    alert('如果要配置协同的表单请在url后添加“?configForm=xietong”参数，配置承诺书表单请在url后添加“?configForm=wenjuan”参数，添加后刷新页面')
  }
