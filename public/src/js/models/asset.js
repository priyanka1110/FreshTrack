/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var Asset = Backbone.Model.extend({
    defaults: {
      assetName: '',
      productId: '',
      location: '',
      sender: '',
      senderOrganization: '',
      receiver: '',
      receiverOrganization: ''
    }
  });

  exports.assetModel = new Asset();

  var Assets = Backbone.Collection.extend({
    model: Asset
  });

  exports.assetsCollection = new Assets();
});
