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
      var transDoneBy = this.options.doneBy;
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
        name: this.model.get('title'),
        // location: this.model.get('location'),
        senderName: this.model.get('senderName'),
        senderOrg: this.model.get('senderOrg'),
        receiverName: this.model.get('receiverName'),
        receiverorg: this.model.get('receiverorg'),
        device: device.uuid,
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
