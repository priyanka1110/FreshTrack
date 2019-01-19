/* global define */
/* global cordova, Offline, StatusBar, device, FastClick*/

define([
  'jquery',
  'moment',
  'backbone',
  'js/app',
  'js/router',
  'js/views/rootView'
], function (
  $,
  moment,
  Backbone,
  app,
  router,
  rootView
) {
  'use strict';

  var application = {
    onPauseTime: null,
    onResumeTime: null,
    initialize: function () {
      this.bindEvents();
    },
    bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      document.addEventListener('resume', (function () {
        this.requestCamera();
        app.checkIsLocationOn();
      }).bind(this), false);
    },
    onDeviceReady: function () {
      this.requestCamera();

      app.FTMobile.rootView = new rootView.RootView();
      app.FTMobile.rootView.render();
      app.FTMobile.AppRouter = new router.Router();
      Backbone.history.start();
      app.FTMobile.start();
    },
    requestCamera: function () {
      cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
        console.log('Authorization request for camera use was ' + (status === cordova.plugins.diagnostic.permissionStatus.GRANTED ? 'granted' : 'denied'));
      }, function (error) {
        console.error(error);
      });
    }
  };

  application.initialize();
});
