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
  compiledTemplates
) {
  'use strict';

  exports.Assets = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      var events = event.eventCollection.toJSON();
      var productDetails = _.last(events).content.data[0];
      this.el.innerHTML = compiledTemplates['templates/assets.hbs']({
        productDetails: productDetails,
        events: events
      });
    },
    onAttach: function () {
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
    }
  });
});
