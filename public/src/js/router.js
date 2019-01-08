/* global define, $, cordova, device, _, mixpanel, infratabOrgId */
/* eslint-disable no-restricted-syntax, new-cap */
define([
  'require',
  'exports',
  'backbone',
  'underscore',
  'moment',
  './app',
  './views/home',
  './views/createAsset',
  './views/getAsset',
  './views/summariesAsset',
  './views/assetDetails',
  './models/asset'
], function (require,
             exports,
             Backbone,
             _,
             moment,
             app,
             homeView,
             createAsset,
             getAsset,
             summariesAsset,
             assetDetails,
             asset) {
  'use strict';

  exports.Router = Backbone.Router.extend({
    routes: {
      'homePage/': 'homePage',
      'createAsset/': 'createAsset',
      'summariesAsset/': 'summariesAsset',
      'assetList/': 'assetList',
      'assetDetails/:id': 'showAssetDetails'
    },
    homePage: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new homeView.HomeView());
    },
    createAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new createAsset.CreateAsset({ model: asset.assetModel }));
    },
    summariesAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new summariesAsset.SummariesAsset({ model: asset.assetModel }));
    },
    assetList: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new getAsset.AssetList({ model: asset.assetModel }));
    },
    showAssetDetails: function (id) {
      var selectedAsset = asset.assetsCollection.filter(function (assetObj) {
        return assetObj.assetId === id;
      });
      app.FTMobile.rootView.showChildView('bodyRegion', new assetDetails.AssetDetails({ model: selectedAsset }));
    }
  });
});
