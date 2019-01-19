/* global define*/
define([
  'require',
  'exports',
  'marionette',
  'backbone',
  'materialize',
  'js/app',
  'js/models/header',
  'templates/compiledTemplates'
], function (require,
             exports,
             Marionette,
             Backbone,
             materialize,
             app,
             header,
             compiledTemplates) {
  'use strict';

  exports.HeaderView = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/header.hbs']({
        headerText: this.model.get('headerText'),
        closeButton: this.model.get('closeButton')
      });
    },
    events: {
      'click #close': 'goToHomePage'
    },
    goToHomePage: function () {
      header.headerModel.set({ closeButton: false });
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    }
  });
});
