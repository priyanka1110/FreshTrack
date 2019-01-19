/* global define, device, cordova */

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
  compiledTemplates
) {
  'use strict';

  exports.CreateEvent = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/createEvent.hbs']({
        assetId: this.model.get('assetId'),
        productName: this.model.get('productName'),
        productId: this.model.get('productId')
      });
    },
    onAttach: function () {
    },
    events: {
      'click #addEvent': 'addEvent',
      'click #cancel': 'cancel'
    },
    onDestroy: function () {
      header.headerModel.set({ currentPage: 'home' });
      event.eventModel.clear().set(event.eventModel.defaults);
    }
  });
});
