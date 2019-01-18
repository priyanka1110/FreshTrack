/* global define*/
define([
  'require',
  'exports',
  'marionette',
  'backbone',
  'templates/compiledTemplates'
], function (require,
             exports,
             Marionette,
             Backbone,
             compiledTemplates) {
  'use strict';

  exports.HeaderView = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/header.hbs']({ headerText: this.model.get('headerText') });
    }
  });
});
