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

  exports.RootView = Marionette.View.extend({
    el: '#mainContainer',
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/rootViewTpl.hbs']();
    },
    regions: {
      headerRegion: '#appbarSidebar',
      bodyRegion: '#body',
      footerView: '#footer'
    }
  });
});
