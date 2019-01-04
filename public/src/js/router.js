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
  './views/summariesAsset',
  './models/asset'
], function (require,
             exports,
             Backbone,
             _,
             moment,
             app,
             homeView,
             createAsset,
             summariesAsset,
             asset) {
  'use strict';

  exports.Router = Backbone.Router.extend({
    routes: {
      'homePage/': 'homePage',
      'createAsset/': 'createAsset',
      'summariesAsset/': 'summariesAsset'
    },
    homePage: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new homeView.HomeView());
    },
    createAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new createAsset.CreateAsset({ model: asset.assetModel }));
    },
    summariesAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new summariesAsset.SummariesAsset({ model: asset.assetModel }));
    }
  });
});
