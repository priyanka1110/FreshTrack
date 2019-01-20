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
  exports.ErrorView = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/errorTpl.hbs']({ assetError: this.options.assetError });
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
    },
    events: {
      'click #redo': 'scanAgain'
    },
    scanAgain: function () {
      // if (this.options.assetError) {
      // }
    }

  });
  exports.AssestNotFound = Marionette.View.extend({
    initialize: function () {
      this.pointsRemaining = null;
    },
    render: function () {
      var productDetails = this.model.toJSON();
      this.pointsRemaining = Math.round(Math.random() * 100);
      productDetails.points = this.pointsRemaining;
      this.options.event.set({ points: this.pointsRemaining });
      this.el.innerHTML = compiledTemplates['templates/assetNotFound.hbs'](productDetails);
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
        points: this.pointsRemaining,
        device: device.uuid,
        type: 'ambrosus.asset.info',
        time: moment.utc().toISOString(),
        name: this.model.get('title'),
        eventType: 'addAsset'
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
      var self = this;
      app.FTMobile.ambrosus.createAsset(productDetails).then(function (response) {
        self.model.set({ assetId: response.data.assetId });
        // Response if successful
        app.FTMobile.AppRouter.navigate('success/', { trigger: true });
        console.log(response);
      }).catch(function (error) {
        // Error if error
        console.log(error);
      });
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
      // headerModel.headerModel.clear().set(headerModel.headerModel.defaults);
    }
  });
  exports.AssestFound = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      var productDetails = this.model.toJSON();
      var pointsRemaining = Math.round(Math.random() * 100);
      productDetails.points = pointsRemaining;
      this.options.event.set({ points: pointsRemaining });
      this.el.innerHTML = compiledTemplates['templates/assetFound.hbs'](productDetails);
    },
    onAttach: function () {
      setTimeout(function () {
        $('.modal').modal();
      }, 1000);
    },
    events: {
      'click #cancel': 'cancel',
      'click #shipper': 'scanConfirmationCode',
      'click #receiver': 'scanConfirmationCode'
    },
    cancel: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    scanConfirmationCode: function (elemEvent) {
      app.FTMobile.AppRouter.navigate('confirmationCode/scan/' + elemEvent.target.id, { trigger: true });
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
      // asset.assetModel.clear().set(asset.assetModel.defaults);
    }
  });
});
