/* global define, am4core, am4charts, am4themes_animated, AmbrosusAddress*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
  'js/app',
  'js/models/event',
  'js/models/header',
  'js/applicationUtilities/charts',
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
  event,
  header,
  charts,
  compiledTemplates
) {
  'use strict';

  exports.Assets = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      var productDetails;
      this.events = event.eventCollection.toJSON();
      if (this.events[0]) {
        productDetails = _.last(this.events).content.data[0];
        this.el.innerHTML = compiledTemplates['templates/transactions.hbs']({
          productDetails: productDetails,
          events: this.events
        });
      } else {
        this.el.innerHTML = compiledTemplates['templates/noTransactions.hbs']();
      }
    },
    onAttach: function () {
      this.renderDonuts();
    },
    renderDonuts: function () {
      this.events.forEach(function (eventObj, index) {
        charts.donut('donut_' + index, eventObj.content.data[0].points, '#00e676', '#ecf0f1', '#000');
        charts.donutValue('donut_' + index, eventObj.content.data[0].points, '');
      });
    },
    events: {
      'click .assetList': 'getAssetDetails',
      'click #goToHomePage': 'goToHomePage'
    },
    goToHomePage: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    getAssetDetails: function (events) {
      app.FTMobile.AppRouter.navigate('assetDetails/?id=' + events.id, { trigger: true });
    },
    onDestroy: function () {
      event.eventCollection.reset();
      header.headerModel.set({ closeButton: false });
    }
  });
});
