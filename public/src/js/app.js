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
  'web3',
  'js/views/modalViews'
], function (exports,
             $,
             moment,
             _,
             Marionette,
             Backbone,
             Web3,
             modalViews) {
  'use strict';

  var thisModule = this;
  exports.FTMobile = new Backbone.Marionette.Application();

  exports.checkIsLocationOn = function () {
    cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
      var locationServiceView;
      var locationServiceModal = $('#modal').find('.locationServicie');

      if (!enabled) {
        if (!locationServiceModal.length) {
          $('#modal').modal({
            dismissible: false,
            complete: function () {
              Backbone.pubSub.trigger('unbindModalEvents');
            }
          });
          $('#modal').modal('open');
          $('body').css('width', '100%');

          locationServiceView = new modalViews.LocationServiceView();
          locationServiceView.render();
        }
      } else if (locationServiceModal.length) {
        Backbone.pubSub.trigger('unbindModalEvents');
      }
    });
  };

  thisModule.FTMobile.views = {};
  thisModule.FTMobile.globals = {
    actionType: null,
    location: {}
  };

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

    thisModule.checkIsLocationOn();

  });
});
