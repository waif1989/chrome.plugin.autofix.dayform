'use strict';

const Controller = require('egg').Controller;
const { PRODUCTIONS_VERSION, PRODUCTIONS } = require('../pluginsDirectory/index');
const { RESPONESE_STATUS } = require('../constantDirectory/index');

class CheckUpdateController extends Controller {
  async index() {
    const { ctx } = this;
    const pluginName = ctx.params.pluginName;
    if (!PRODUCTIONS[pluginName]) {
      ctx.body = {
        code: RESPONESE_STATUS.FAIL,
        msg: '没有该插件',
        data: null,
      };
      ctx.status = 200;
      return;
    }
    const pluginVersion = PRODUCTIONS_VERSION[PRODUCTIONS[pluginName]];
    ctx.body = {
      code: RESPONESE_STATUS.SUC,
      msg: '',
      data: {
        version: pluginVersion,
      },
    };
    ctx.status = 200;
  }
}

module.exports = CheckUpdateController;
