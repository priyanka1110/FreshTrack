/* global define */
/* global mixpanel, cordova, device, powerbi */
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
  'ambrosus'
], function (require,
             exports,
             $,
             _,
             Backbone,
             Marionette,
             materialize,
             app,
             assetModel,
             event,
             header,
             compiledTemplates) {
  'use strict';

  exports.HomeView = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/homePage.hbs']();
    },
    events: {
      'click #getAsset': 'showAssets',
      'click #addTransaction': 'createTransaction'
    },
    createAsset: function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          assetModel.assetModel.set({ productId: result.text });
          console.log(result.text);
          app.FTMobile.AppRouter.navigate('createAsset/', { trigger: true });
        },
        function (error) {
          console.log('Error in bar code scanner ', error);
        }
      );
    },
    getEventSuccessCallback: function (transResponse, assetResponse, productId) {
      if (transResponse.data.resultCount === 0) {
        // Asset not found so update only the asset model
        assetModel.assetModel.clear().set(assetModel.assetModel.defaults);
        assetModel.assetModel.set(assetResponse[0].items[0]);
        assetModel.assetModel.set({ ean: productId });
        header.headerModel.set({ currentPage: 'addAsset' });
        app.FTMobile.AppRouter.navigate('assetNotFound/', { trigger: true });
      } else {
        // Asset found so save the data in asset and event model
        assetModel.assetModel.clear().set(assetModel.assetModel.defaults);
        assetModel.assetModel.set(assetResponse[0].items[0]);
        assetModel.assetModel.set({
          assetId: transResponse.data.results[0].content.idData.assetId
        });
        event.eventModel.clear().set(event.eventModel.defaults);
        event.eventModel.set({
          productId: transResponse.data.results[0].content.data[0].productId
        });
        header.headerModel.set({ currentPage: 'handover' });
        app.FTMobile.AppRouter.navigate('assetFound/', { trigger: true });
      }
      $('.preloader-wrapper').addClass('hide');
    },
    createTransaction: function () {
      var self = this;
      // var proxy = 'https://cors-anywhere.herokuapp.com/';
      var deffereds = [];
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          $('.preloader-wrapper').removeClass('hide');
          deffereds.push(app.FTMobile.ambrosus.getEvents({ 'data[productId]': result.text }));
          // remove the proxy if you can handle CORS
          deffereds.push($.ajax({
            url: 'https://api.upcitemdb.com/prod/trial/lookup?upc=' + result.text,
            type: 'GET'
          }));
          $.when.apply($, deffereds).then(function (transPromise, assetResponse) {
            transPromise.then(function (transResponse) {
              self.getEventSuccessCallback(transResponse, assetResponse, result.text);
            }).catch(function (error) {
              // Error if error
              console.log(error);
            });
          }, function (error) {
            // Error if error
            console.log(error);
          });
        },
        function (error) {
          console.log('Error in bar code scanner ', error);
        }
      );
    },
    showAssets: function () {
      $('.preloader-wrapper').removeClass('hide');
      app.FTMobile.ambrosus.getEvents({ 'data[device]': device.uuid }).then(function (response) {
        response.data.results.forEach(function (eventObj) {
          event.eventCollection.add(eventObj);
        });
        $('.preloader-wrapper').addClass('hide');
        app.FTMobile.AppRouter.navigate('assets/', { trigger: true });
      }).catch(function (error) {
        // Error if error
        console.log(error);
      });
    }
  });
});
