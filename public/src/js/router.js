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
  './views/createEvent',
  './views/getAsset',
  './views/summariesAsset',
  './views/assetDetails',
  './views/successPage',
  './models/asset',
  './models/event'
], function (require,
             exports,
             Backbone,
             _,
             moment,
             app,
             homeView,
             createAsset,
             createEvent,
             getAsset,
             summariesAsset,
             assetDetails,
             successPage,
             asset,
             event) {
  'use strict';

  exports.Router = Backbone.Router.extend({
    routes: {
      'homePage/': 'homePage',
      'createAsset/': 'createAsset',
      'createEvent/': 'createEvent',
      'summariesAsset/': 'summariesAsset',
      'assets/': 'showAsset',
      'assetDetails/:id': 'showAssetDetails',
      'success/': 'successPage'
    },
    homePage: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new homeView.HomeView());
    },
    createAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new createAsset.CreateAsset({ model: asset.assetModel }));
    },
    createEvent: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new createEvent.CreateEvent({ model: event.eventModel }));
    },
    summariesAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new summariesAsset.SummariesAsset({ model: asset.assetModel }));
    },
    showAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new getAsset.Assets({ model: event.eventCollection }));
    },
    successPage: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new successPage.SuccessPage({ model: asset.assetModel }));
    },
    showAssetDetails: function (id) {
      var selectedAsset = asset.assetsCollection.filter(function (assetObj) {
        return assetObj.assetId === id;
      });
      app.FTMobile.rootView.showChildView('bodyRegion', new assetDetails.AssetDetails({ model: selectedAsset }));
    }
  });
});
