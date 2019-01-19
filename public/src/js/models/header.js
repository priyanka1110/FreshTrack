/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var Header = Backbone.Model.extend({
    defaults: {
      headerText: '',
      currentPage: 'home',
      closeButton: false,
      headerButtons: false
    }
  });
  exports.headerModel = new Header();
});
