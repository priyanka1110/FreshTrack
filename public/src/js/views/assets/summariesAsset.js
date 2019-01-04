/* global define, am4core, am4charts, am4themes_animated*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'js/models/asset',
  'templates/compiledTemplates'
], function (
  exports,
  Marionette,
  $,
  _,
  Backbone,
  moment,
  asset,
  compiledTemplates
) {
  'use strict';
  exports.SummariesAsset = Marionette.View.extend({
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
      'click #submit': 'submitAsset'
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
    onDestroy: function () {
    }
  });
});
