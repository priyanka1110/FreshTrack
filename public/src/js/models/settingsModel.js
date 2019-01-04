/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var SettingsModel = Backbone.Model.extend({
    defaults: {
    }
  });

  exports.settingsModelObj = new SettingsModel();
});
