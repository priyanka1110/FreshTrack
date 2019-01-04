/* global define */
/* global cordova, Offline, StatusBar, device, FastClick*/

define([
  'jquery',
  'moment',
  'backbone',
  'js/app',
  'js/router',
  'js/views/rootView'
], function ($,
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
    },
    onDeviceReady: function () {
      app.FTMobile.rootView = new rootView.RootView();
      app.FTMobile.rootView.render();
      app.FTMobile.AppRouter = new router.Router();
      Backbone.history.start();
      app.FTMobile.start();
    }
  };

  application.initialize();
});
