const pluginId = chrome.runtime.id;
chrome.storage.local.get('autoFixFormVersion', function (data) {
  document.getElementById('version').innerText = data.autoFixFormVersion
});

let autoFixPhone = document.getElementById('autoFixPhone');
let autoFixForm = document.getElementById('autoFixForm');
let autoFixFormWenJuan = document.getElementById('autoFixFormWenJuan');

let configPhone = document.getElementById('phoneConfig');
let configLink = document.getElementById('pluginConfig');
let configLinkWenJuan = document.getElementById('pluginConfigWenJuan');

// 行程卡
chrome.storage.sync.get('titlePhone', function(data) {
  const title = data.titlePhone || '请先点击配置手机号码信息...';
  autoFixPhone.setAttribute('value', title); // 设置插件按钮文案
  if (!data.titlePhone) {
    document.getElementById('autoFixPhoneItem').style.display = 'none';
  } else {
    document.getElementById('phoneConfigItem').style.display = 'none';
    document.getElementById('phoneConfigChange').setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=xingcheng`);
  }
});

// 协同
chrome.storage.sync.get('title', function(data) {
  const title = data.title || '请先点击“#协同配置”进行配置...';
  autoFixForm.setAttribute('value', title); // 设置插件按钮文案
  if (!data.title) {
    document.getElementById('autoFixFormItem').style.display = 'none';
  } else {
    document.getElementById('pluginConfigItem').style.display = 'none';
    document.getElementById('pluginConfigChange').setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=xietong`);
  }
});

// 承诺书
chrome.storage.sync.get('titleWenJuan', function(data) {
  const title = data.titleWenJuan || '请先点击“#到岗承诺书配置”进行配置...';
  autoFixFormWenJuan.setAttribute('value', title); // 设置插件按钮文案
  if (!data.titleWenJuan) {
    document.getElementById('autoFixFormWenJuanItem').style.display = 'none';
  } else {
    document.getElementById('pluginConfigWenJuanItem').style.display = 'none';
    document.getElementById('pluginConfigWenJuanChange').setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=wenjuan`);
  }
});

configPhone.setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=xingcheng`);
configLink.setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=xietong`);
configLinkWenJuan.setAttribute('href', `chrome-extension://${pluginId}/options.html?configForm=wenjuan`);

autoFixPhone.onclick = function(element) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'injectPhone.js'
      }
    );
  });
};

autoFixForm.onclick = function(element) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'inject.js'
      }
    );
  });
};

autoFixFormWenJuan.onclick = function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'injectWenJuan.js'
      }
    );
  });
}
