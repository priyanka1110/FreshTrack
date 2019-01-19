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
  'js/models/asset',
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
  asset,
  event,
  compiledTemplates
) {
  'use strict';

  exports.CreateAsset = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.model.set({ points: Math.round(Math.random() * 100) });
      this.el.innerHTML = compiledTemplates['templates/createAsset.hbs'](this.model.toJSON());
    },
    onAttach: function () {
    },
    events: {
      'click #addProduct': 'addProduct',
      'click #cancel': 'cancel'
    },
    onDestroy: function () {
      asset.assetModel.clear().set(asset.assetModel.defaults);
    }
  });
  exports.AssestNotFound = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/assetNotFound.hbs']({
        productId: this.model.get('ean'),
        productName: this.model.get('title')
      });
    },
    onAttach: function () {
    },
    events: {
      'click #addAsset': 'addAsset',
      'click #cancel': 'cancel'
    },
    cancel: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    getFormData: function () {
      var productDetails = {
        orgName: localStorage.getItem('orgName'),
        productId: this.model.get('ean'),
        addedBy: localStorage.getItem('userName'),
        points: Math.round(Math.random() * 100),
        device: device.uuid,
        type: 'ambrosus.asset.info',
        time: moment.utc().toISOString(),
        name: this.model.get('title')
      };
      asset.assetModel.set(productDetails);
      return productDetails;
    },
    addAsset: function () {
      var productDetails = [{
        content: {
          data: [
            this.getFormData()
          ]
        }
      }];
      app.FTMobile.ambrosus.createAsset(productDetails).then(function (response) {
        // Response if successful
        app.FTMobile.AppRouter.navigate('success/', { trigger: true });
        console.log(response);
      }).catch(function (error) {
        // Error if error
        console.log(error);
      });
    },
    onDestroy: function () {
      // headerModel.headerModel.clear().set(headerModel.headerModel.defaults);
    }
  });
  exports.AssestFound = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/assetFound.hbs'](this.model.toJSON());
    },
    onAttach: function () {
      var self = this;
      setTimeout(function () {
        $('.modal').modal();
      }, 2000);
    },
    events: {
      'click #confirm': 'confirmAsset',
      'click #cancel': 'cancel',
      'click #shipper': 'confirmSecondParty',
      'click #receiver': 'confirmSecondParty'
    },
    cancel: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    confirmAsset: function () {
      $('.modal').modal({ onCloseStart: this.onCloseModal });
    },
    scanConfirmationCode: function (event) {
      app.FTMobile.AppRouter.navigate('confirmationCode/scan/' + event.id, { trigger: true });
    },
    onDestroy: function () {
      // asset.assetModel.clear().set(asset.assetModel.defaults);
    }
  });
});
