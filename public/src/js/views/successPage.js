/* global define, am4core, am4charts, am4themes_animated, cordova */

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
  'js/app',
  'js/models/asset',
  'templates/compiledTemplates'
], function (
  exports,
  Marionette,
  $,
  _,
  Backbone,
  moment,
  materialize,
  app,
  asset,
  compiledTemplates
) {
  'use strict';

  exports.SuccessPage = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/successPage.hbs']({
        successText: this.options.successText
      });
    },
    onAttach: function () {
    },
    events: {
      'click #goToHomePage': 'goToHomePage'
    },
    goToHomePage: function () {
      // TODO: set model default
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    onDestroy: function () {
    }
  });
});
