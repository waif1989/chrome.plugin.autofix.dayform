'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const { PRODUCTIONS } = require('../pluginsDirectory/index');

class UpdatefileService extends Service {
  async getUpdateCode(pluginName) {
    switch (pluginName) {
      case PRODUCTIONS.autoFixForm:
        const popupCode = await new Promise(resolve => {
          const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/popup.js`));
          let content = '';
          readStream.setEncoding('utf8');
          readStream.on('data', function(chunk) {
            content += chunk;
          });
          readStream.on('end', function() {
            resolve(Terser.minify(content).code);
          });
        });
        const optionsCode = await new Promise(resolve => {
          const readStream = fs.createReadStream(path.join(__dirname, `../appUpdatefiles/${pluginName}/options.js`));
          let content = '';
          readStream.setEncoding('utf8');
          readStream.on('data', function(chunk) {
            content += chunk;
          });
          readStream.on('end', function() {
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
            resolve(Terser.minify(content).code);
          });
        });
        return {
          popupCode,
          optionsCode,
          injectCode,
          injectPhoneCode,
          injectWenJuanCode,
        };
      default: return null;
    }
  }
}
module.exports = UpdatefileService;
