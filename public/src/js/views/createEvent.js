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
    getFormData: function () {
      var eventDetails = {
        name: this.$el.find('#product_name').val(),
        location: this.$el.find('#location').val(),
        senderName: this.$el.find('#sender_name').val(),
        senderOrg: this.$el.find('#sender_org').val(),
        receiverName: this.$el.find('#receiver_name').val(),
        receiverorg: this.$el.find('#receiver_org').val(),
        addDetails: this.$el.find('#addDetails').val(),
        type: 'ambrosus.asset.info',
        time: moment.utc().toISOString()
      };
      event.eventModel.set(eventDetails);
      return eventDetails;
    },
    cancel: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    addEvent: function () {
      var eventDetails = {
        content: {
          data: [
            this.getFormData()
          ]
        }
      };
      app.FTMobile.ambrosus.createEvent(this.model.get('assetId'), eventDetails).then(function (response) {
        // Response if successful
        app.FTMobile.AppRouter.navigate('success/', { trigger: true });
        console.log(response);
      }).catch(function (error) {
        // Error if error
        console.log(error);
      });
    },
    onDestroy: function () {
      header.headerModel.set({ currentPage: 'home' });
      event.eventModel.clear().set(event.eventModel.defaults);
    }
  });
});
