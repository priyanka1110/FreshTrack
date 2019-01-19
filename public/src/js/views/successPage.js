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
  'js/models/header',
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
  header,
  compiledTemplates
) {
  'use strict';

  exports.SuccessPage = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      var handover = this.options.currentPage === 'handover' ? true : false;
      this.el.innerHTML = compiledTemplates['templates/successPage.hbs']({
        title: this.model.get('title'),
        senderName: this.model.get('senderName'),
        handover: handover
      });
    },
    onAttach: function () {
      setTimeout(function () {
        $('.modal').modal();
      }, 1000);
    },
    events: {
      'click #goToHomePage': 'goToHomePage',
      'click #handover': 'showHandover',
      'click #shipper': 'scanConfirmationCode',
      'click #receiver': 'scanConfirmationCode'
    },
    goToHomePage: function () {
      // TODO: set model default
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    scanConfirmationCode: function (elemEvent) {
      app.FTMobile.AppRouter.navigate('confirmationCode/scan/' + elemEvent.target.id, { trigger: true });
    },
    onDestroy: function () {
      header.headerModel.set({ currentPage: 'home' });
      header.headerModel.set({ closeButton: false });
    }
  });
});
