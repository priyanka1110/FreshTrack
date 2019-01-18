/* eslint-disable */
/* global define*/
/* global openDatabase*/
/* global Offline, cordova, Camera, StatusBar, AmbrosusAddress, AmbrosusSecret, AmbrosusSDK*/

define([
  'exports',
  'jquery',
  'moment',
  'underscore',
  'marionette',
  'backbone',
  'web3'
], function (exports,
             $,
             moment,
             _,
             Marionette,
             Backbone,
             Web3) {
  'use strict';

  var thisModule = this;
  exports.FTMobile = new Backbone.Marionette.Application();

  thisModule.FTMobile.views = {};

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
  });
});
