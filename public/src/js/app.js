/* global define*/
/* global openDatabase*/
/* global Offline, cordova, Camera, StatusBar*/

define([
  'exports',
  'jquery',
  'moment',
  'underscore',
  'marionette',
  'backbone'
], function (exports,
             $,
             moment,
             _,
             Marionette,
             Backbone) {
  'use strict';

  var thisModule = this;
  exports.FTMobile = new Backbone.Marionette.Application();

  thisModule.FTMobile.views = {};

  // application start event
  thisModule.FTMobile.on('start', function () {
    thisModule.FTMobile.AppRouter.navigate('landingPage/', { trigger: true });
  });
});
