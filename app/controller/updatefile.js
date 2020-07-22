'use strict';

const Controller = require('egg').Controller;
const { PRODUCTIONS } = require('../pluginsDirectory/index');
const { RESPONESE_STATUS } = require('../constantDirectory/index');

class UpdateFileController extends Controller {
  async updateCode() {
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
    const data = await ctx.service.updatefile.getUpdateCode(pluginName);
    ctx.body = {
      code: RESPONESE_STATUS.SUC,
      msg: '',
      data,
    };
    ctx.status = 200;
  }
}

module.exports = UpdateFileController;
