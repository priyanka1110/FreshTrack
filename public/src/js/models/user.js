/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var User = Backbone.Model.extend({
    defaults: {
      userName: '',
      email: '',
      orgName: ''
    }
  });
  exports.userModel = new User();
});
