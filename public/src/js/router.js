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
  './views/asset',
  './views/createEvent',
  './views/getAsset',
  './views/summariesAsset',
  './views/assetDetails',
  './views/successPage',
  './views/header',
  './views/userDetails',
  './views/qrCode',
  './models/asset',
  './models/event',
  'js/models/header'
], function (require,
             exports,
             Backbone,
             _,
             moment,
             app,
             homeView,
             asset,
             createEvent,
             getAsset,
             summariesAsset,
             assetDetails,
             successPage,
             header,
             userDetails,
             qrCode,
             assetModel,
             event,
             headerModel) {
  'use strict';

  exports.Router = Backbone.Router.extend({
    routes: {
      'homePage/': 'homePage',
      'createAsset/': 'createAsset',
      'transactions/': 'createEvent',
      'assetNotFound/': 'showAssetNotFound',
      'assetFound/': 'showAssetFound',
      'confimationCode/show/': 'showConfimationCode',
      'confimationCode/scan/': 'scanConfimationCode',
      'assets/': 'showAsset',
      'assetDetails/:id': 'showAssetDetails',
      'success/': 'successPage',
      'users/': 'profile'
    },
    homePage: function () {
      headerModel.headerModel.set({ headerText: 'Home' });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new homeView.HomeView());
    },
    profile: function () {
      headerModel.headerModel.set({
        headerText: 'Profile',
        closeButton: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new userDetails.UserView());
    },
    showAssetNotFound: function () {
      headerModel.headerModel.set({
        headerText: 'Asset does not exist',
        closeButton: true
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.AssestNotFound({ model: assetModel.assetModel }));
    },
    showAssetFound: function () {
      headerModel.headerModel.set({
        headerText: 'Asset exists',
        closeButton: true
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.AssestFound({ model: assetModel.assetModel }));
    },
    createAsset: function () {
      headerModel.headerModel.set({ headerText: 'Add Asset' });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.CreateAsset({ model: assetModel.assetModel }));
    },
    showConfimationCode: function () {
      headerModel.headerModel.set({
        headerText: 'Confirmation Code',
        closeButton: true
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new qrCode.ConfirmationCode({ model: event.eventModel }));
    },
    scanConfimationCode: function () {

    },
    createEvent: function () {
      headerModel.headerModel.set({ headerText: 'Handover' });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new createEvent.CreateEvent({ model: event.eventModel }));
    },
    summariesAsset: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new summariesAsset.SummariesAsset({ model: assetModel.assetModel }));
    },
    showAsset: function () {
      var events = event.eventCollection.toJSON();
      headerModel.headerModel.set({ headerText: events[0].content.data[0].name });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new getAsset.Assets({ model: event.eventCollection }));
    },
    successPage: function () {
      var headerText;
      var successMessage;
      if (headerModel.headerModel.get('currentPage') === 'handover') {
        headerText = 'Handover successfully!';
        successMessage = event.eventModel.get('name') +
          ' is successfully handover to ' + event.eventModel.get('senderName');
      } else {
        headerText = 'Product Added!';
        successMessage = asset.assetModel.get('name') + ' is successfully added!';
      }
      headerModel.headerModel.set({ headerText: headerText });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new successPage.SuccessPage({ successText: successMessage }));
    },
    showAssetDetails: function (id) {
      var selectedAsset = asset.assetsCollection.filter(function (assetObj) {
        return assetObj.assetId === id;
      });
      app.FTMobile.rootView.showChildView('bodyRegion', new assetDetails.AssetDetails({ model: selectedAsset }));
    }
  });
});
