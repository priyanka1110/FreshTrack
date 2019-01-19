/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var Assets;
  var Asset = Backbone.Model.extend({
    defaults: {
      ean: '',
      title: '',
      description: '',
      elid: '',
      brand: '',
      model: '',
      color: '',
      size: '',
      dimension: '',
      weight: '',
      lowest_recorded_price: null,
      highest_recorded_price: null,
      images: [],
      offers: []
    }
  });

  exports.assetModel = new Asset();

  Assets = Backbone.Collection.extend({
    model: Asset
  });

  exports.assetsCollection = new Assets();
});
