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
      'confirmationCode/show/': 'showConfimationCode',
      'confirmationCode/scan/:doneBy': 'scanConfimationCode',
      'assets/': 'showAsset',
      'assetDetails/:id': 'showAssetDetails',
      'success/': 'successPage',
      'users/': 'profile',
      'errorPage/:currentPage/': 'showErrorPage'
    },
    homePage: function () {
      headerModel.headerModel.set({
        headerText: 'Smart Perishable',
        closeButton: false,
        headerButtons: true
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new homeView.HomeView());
    },
    profile: function () {
      var enableCloseButton;
      if (headerModel.headerModel.get('currentPage') === 'profile') {
        enableCloseButton = true;
      } else {
        enableCloseButton = false;
      }
      headerModel.headerModel.set({
        headerText: 'Profile',
        closeButton: enableCloseButton,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new userDetails.UserView());
    },
    showErrorPage: function (currentPage) {
      var assetError = currentPage === 'assets';
      var headerText;
      if (assetError) {
        headerText = 'Asset not found';
      } else {
        headerText = 'Handover confirmation failed!';
      }
      headerModel.headerModel.set({
        headerText: headerText,
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.ErrorView({ assetError: assetError }));
    },
    showAssetNotFound: function () {
      headerModel.headerModel.set({
        headerText: assetModel.assetModel.get('title'),
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.AssestNotFound({ model: assetModel.assetModel, event: event.eventModel }));
    },
    showAssetFound: function () {
      headerModel.headerModel.set({
        headerText: assetModel.assetModel.get('title'),
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.AssestFound({ model: assetModel.assetModel, event: event.eventModel }));
    },
    createAsset: function () {
      headerModel.headerModel.set({ headerText: 'Add Asset' });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new asset.CreateAsset({ model: assetModel.assetModel }));
    },
    showConfimationCode: function () {
      headerModel.headerModel.set({
        headerText: 'Confirmation Code',
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new qrCode.ConfirmationCode({ model: event.eventModel }));
    },
    scanConfimationCode: function (doneBy) {
      headerModel.headerModel.set({
        headerText: 'Handover',
        closeButton: true,
        headerButtons: false
      });
      headerModel.headerModel.set({ currentPage: 'handover' });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new qrCode.ScanConfirmationCode({
        model: assetModel.assetModel,
        event: event.eventModel,
        doneBy: doneBy
      }));
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
      var headerText = events[0] ? 'Transactions' : 'Transactions';
      headerModel.headerModel.set({
        headerText: headerText,
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new getAsset.Assets({ model: event.eventCollection }));
    },
    successPage: function () {
      var headerText;
      // var successMessage;
      var currentPage = headerModel.headerModel.get('currentPage');
      if (currentPage === 'handover') {
        headerText = 'Handover successful!';
        // successMessage = '<b>' + assetModel.assetModel.get('title') +
        //   '</b> is successfully handover to <b>' + event.eventModel.get('senderName') + '</b>';
      } else {
        headerText = 'Asset added!';
        // successMessage = '<b>' + assetModel.assetModel.get('title') +
        // '</b> is successfully added!';
      }
      headerModel.headerModel.set({
        headerText: headerText,
        closeButton: true,
        headerButtons: false
      });
      app.FTMobile.rootView.showChildView('headerRegion', new header.HeaderView({ model: headerModel.headerModel }));
      app.FTMobile.rootView.showChildView('bodyRegion', new successPage.SuccessPage({
        model: assetModel.assetModel,
        currentPage: currentPage,
        event: event.eventModel
      }));
    },
    showAssetDetails: function (id) {
      var selectedAsset = asset.assetsCollection.filter(function (assetObj) {
        return assetObj.assetId === id;
      });
      app.FTMobile.rootView.showChildView('bodyRegion', new assetDetails.AssetDetails({ model: selectedAsset }));
    }
  });
});
