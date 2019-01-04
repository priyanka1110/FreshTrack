/* global define, am4core, am4charts, am4themes_animated*/

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
      this.el.innerHTML = compiledTemplates['templates/createAssetEvent.hbs']({
        assetName: this.model.get('assetName')
      });
    },
    onAttach: function () {
    },
    events: {
      'click #scanCode': 'initializeScanner',
      'click #goToSummaryPage': 'goToNextPage'
    },
    initializeScanner: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          asset.assetModel.set({assetName: result.text});
          console.log(result.text);
          self.render();
        },
        function (error) {
          console.log(error);
        }
      );
    },
    goToNextPage: function () {
      var needTagData = $('#needProductData')[0].checked;
      if (needTagData) {
        app.FTMobile.AppRouter.navigate('getTagData/', { trigger: true });
      } else {
        app.FTMobile.AppRouter.navigate('summariesAsset/', { trigger: true });
      }
    },
    onDestroy: function () {
    }
  });
});
