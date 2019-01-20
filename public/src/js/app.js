/* eslint-disable */
/* global define*/
/* global openDatabase*/
/* global Offline, M, cordova, Camera, StatusBar, AmbrosusAddress, AmbrosusSecret, AmbrosusSDK*/

define([
  'exports',
  'jquery',
  'moment',
  'underscore',
  'marionette',
  'backbone',
  'materialize',
  'web3',
  'js/views/modalViews'
], function (exports,
             $,
             moment,
             _,
             Marionette,
             Backbone,
             materialize,
             Web3,
             modalViews) {
  'use strict';

  var thisModule = this;
  exports.FTMobile = new Backbone.Marionette.Application();

  exports.checkIsLocationOn = function () {
    cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
      var elems;
      var instance;
      if (!enabled) {
        elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
        instance = M.Modal.getInstance(elems[0]);
        instance.open();
      }
    });
  };
  $('#enableLocation').click(function () {
    cordova.plugins.diagnostic.switchToLocationSettings();
  });
  // application start event
  thisModule.FTMobile.on('start', function () {
    thisModule.FTMobile.ambrosus = new AmbrosusSDK({
      // Provide env variables
      secret: AmbrosusSecret,
      address: AmbrosusAddress,
      Web3: Web3,
      apiEndpoint: 'https://gateway-test.ambrosus.com'
    });
    if (localStorage.getItem('email')) {
      thisModule.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    } else {
      thisModule.FTMobile.AppRouter.navigate('users/', { trigger: true });
    }

    // thisModule.checkIsLocationOn();

  });
});
