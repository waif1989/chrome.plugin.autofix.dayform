'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const Terser = require("terser");
const { PRODUCTIONS } = require('../pluginsDirectory/index');
const { RESPONESE_STATUS } = require('../constantDirectory/index');

class UpdateFileController extends Controller {
  async popupjs() {
    const { ctx } = this;
    const pluginName = PRODUCTIONS[ctx.params.pluginName];
    if (!PRODUCTIONS[pluginName]) {
      ctx.body = {
        code: RESPONESE_STATUS.FAIL,
        msg: '没有该插件',
        data: null,
      };
      ctx.status = 200;
      return;
    }

    const popupCode = await new Promise(resolve => {
      const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/popup.js`));
      let content = '';

      readStream.setEncoding('utf8');

      readStream.on('data', function(chunk) {
        content += chunk;
      });

      readStream.on('end', function() {
        // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
        resolve(Terser.minify(content).code);
      });
    });

    const injectCode = await new Promise(resolve => {
      const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/inject.js`));
      let content = '';

      readStream.setEncoding('utf8');

      readStream.on('data', function(chunk) {
        content += chunk;
      });

      readStream.on('end', function() {
        // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
        resolve(Terser.minify(content).code);
      });
    });

    const injectPhoneCode = await new Promise(resolve => {
      const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/injectPhone.js`));
      let content = '';

      readStream.setEncoding('utf8');

      readStream.on('data', function(chunk) {
        content += chunk;
      });

      readStream.on('end', function() {
        // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
        resolve(Terser.minify(content).code);
      });
    });

    const injectWenJuanCode = await new Promise(resolve => {
      const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/injectWenJuan.js`));
      let content = '';

      readStream.setEncoding('utf8');

      readStream.on('data', function(chunk) {
        content += chunk;
      });

      readStream.on('end', function() {
        // 文件读取完成，文件内容是 [你好，我是程序猿小卡]
        resolve(Terser.minify(content).code);
      });
    });

    ctx.body = {
      code: RESPONESE_STATUS.SUC,
      msg: '',
      data: {
        popupCode,
        injectCode,
        injectPhoneCode,
        injectWenJuanCode,
      },
    };
    ctx.status = 200;
  }

  async optionsjs() {
    const { ctx } = this;
    const pluginName = PRODUCTIONS[ctx.params.pluginName];
    if (!PRODUCTIONS[pluginName]) {
      ctx.body = {
        code: RESPONESE_STATUS.FAIL,
        msg: '没有该插件',
        data: null,
      };
      ctx.status = 200;
      return;
    }
    ctx.body = {
      code: RESPONESE_STATUS.SUC,
      msg: '',
      data: {
        optionsCode: '',
      },
    };
    ctx.status = 200;
  }
}

module.exports = UpdateFileController;
