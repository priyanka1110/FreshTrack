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

  exports.CreateAsset = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/createEvent.hbs']({
        assetId: this.model.get('assetId')
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
        orgName: this.$el.find('#org_name').innerHTML,
        name: this.$el.find('#product_name').innerHTML,
        type: 'ambrosus.asset.info'
      };
      event.eventModel.set(eventDetails);
      return eventDetails;
    },
    cancel: function () {
      // TODO: set model default
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    addEvent: function () {
      var eventDetails = [{
        content: {
          data: [
            this.getFormData()
          ]
        }
      }];
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
    }
  });
});
