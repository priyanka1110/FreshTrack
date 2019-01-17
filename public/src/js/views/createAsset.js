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
  'js/models/asset',
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
  compiledTemplates
) {
  'use strict';

  exports.CreateAsset = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/createAsset.hbs']({
        productId: this.model.get('productId')
      });
    },
    onAttach: function () {
    },
    events: {
      'click #addProduct': 'addProduct',
      'click #cancel': 'cancel'
    },
    getFormData: function () {
      var productDetails = {
        orgName: this.$el.find('#org_name').val(),
        name: this.$el.find('#product_name').val(),
        productId: this.model.get('productId'),
        location: this.$el.find('#location').val(),
        addedBy: this.$el.find('#addedBy').val(),
        addDetails: this.$el.find('#addDetails').val(),
        type: 'ambrosus.asset.info'
      };
      asset.assetModel.set(productDetails);
      return productDetails;
    },
    cancel: function () {
      // TODO: set model default
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    addProduct: function () {
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
    }
  });
});
