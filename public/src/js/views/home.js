/* eslint-disable */
/* global define */
/* global mixpanel, powerbi */
define([
  'require',
  'exports',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'materialize',
  'js/app',
  'js/models/asset',
  'js/models/event',
  'js/models/header',
  'templates/compiledTemplates',
  'web3',
  'ambrosus'
], function (require,
             exports,
             $,
             _,
             Backbone,
             Marionette,
             materialize,
             app,
             asset,
             event,
             header,
             compiledTemplates,
             Web3) {
  'use strict';

  exports.HomeView = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/homePage.hbs']();
    },
    events: {
      'click #addAsset': 'createAsset',
      'click #getAsset': 'showAssets',
      'click #addEvent': 'createEvent'
    },
    createAsset: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          asset.assetModel.set({ productId: result.text });
          console.log(result.text);
          app.FTMobile.AppRouter.navigate('createAsset/', { trigger: true });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
    },
    createEvent: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          app.FTMobile.ambrosus.getEvents({ "data[productId]": result.text }).then(function (response) {
            // Response if successful
            event.eventModel.set({ 
              assetId: response.data.results[0].content.idData.assetId,
              productName: response.data.results[0].content.data[0].name,
              productId: response.data.results[0].content.data[0].productId });
            console.log(result.text);
            header.headerModel.set({ currentPage: 'handover' });
            app.FTMobile.AppRouter.navigate('createEvent/', { trigger: true });
          }).catch(function (error) {
            // Error if error
            console.log(error);
          });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
    },
    showAssets: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          app.FTMobile.ambrosus.getEvents({ "data[productId]": result.text }).then(function (response) {
            app.FTMobile.ambrosus.getEvents(
              { assetId: response.data.results[0].content.idData.assetId }).then(function (response) {
              response.data.results.forEach(function (eventObj) {
                event.eventCollection.add(eventObj);
              });
              console.log(result.text);
              app.FTMobile.AppRouter.navigate('assets/', { trigger: true });
            }).catch(function (error) {
              // Error if error
              console.log(error);
            });
          }).catch(function (error) {
            // Error if error
            console.log(error);
          });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
    }
  });
});
