/* global define, am4core, am4charts, am4themes_animated, AmbrosusAddress*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
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
  asset,
  compiledTemplates
) {
  'use strict';
  exports.SummariesAsset = Marionette.View.extend({
    initialize: function () {
      this.ambrosus.getEvents({createdBy: AmbrosusAddress}).then(function(response) {
        // Response if successful
        response.each(function (assetObj) {
          asset.assetsCollection.add(assetObj);
        });
      }).catch(function(error) {
        // Error if error
        console.log(error);
      });
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/assetList.hbs']({
        assets: asset.assetsCollection.toJson();
      });
    },
    onAttach: function () {
    },
    events: {
      'click #submit': 'submitAsset'
      'click .assetList': 'getAssetDetails'
    },
    submitAsset: function () {
      this.ambrosus.createAsset(this.model).then(function(response) {
        // Response if successful
        console.log(response);
      }).catch(function(error) {
        // Error if error
        console.log(error);
      });
    },
    getAssetDetails: function (event) {
      app.FTMobile.AppRouter.navigate('assetDetails/?id='event.id, { trigger: true });
    },
    onDestroy: function () {
    }
  });
});
