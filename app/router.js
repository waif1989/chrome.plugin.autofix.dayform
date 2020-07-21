'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/check-update/:pluginName', controller.checkupdate.index);
  router.get('/get-update-file/:pluginName/popupjs', controller.updatefile.popupjs);
  router.get('/get-update-file/:pluginName/optionsjs', controller.updatefile.optionsjs);
};
