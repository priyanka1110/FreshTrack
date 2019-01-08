/* global define, am4core, am4charts, am4themes_animated, AmbrosusAddress*/

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

  exports.AssetDetails = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/assetDetails.hbs']({
        assetName: this.model.get('assetName')
      });
    }
  });
});
