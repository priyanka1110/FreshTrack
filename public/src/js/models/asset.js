/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var Asset = Backbone.Model.extend({
    defaults: {
      assetName: ''
    }
  });

  exports.assetModel = new Asset();
});
