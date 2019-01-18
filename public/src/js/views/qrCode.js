/* global define, device, cordova */

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
  'qrcode',
  'js/app',
  'templates/compiledTemplates'
], function (
  exports,
  Marionette,
  $,
  _,
  Backbone,
  moment,
  materialize,
  qrcode,
  app,
  compiledTemplates
) {
  'use strict';

  exports.ConfirmationCode = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/confirmationCode.hbs']();
    },
    onAttach: function () {
      var qrCodeData = {
        deviceId: device.uuid,
        location: {},
        userName: localStorage.getItem('userName'),
        organizationName: localStorage.getItem('orgName')
      };

      this.getLocationData(function (position) {
        qrCodeData.location.latitude = position.coords.latitude;
        qrCodeData.location.longitude = position.coords.longitude;
        qrCodeData.confirmtationCodeGeneratedAt = moment().format();
        $(this.el).find('#confirmationCode').html('');

        $(this.el).find('#confirmationCode').qrcode({
          text: JSON.stringify(qrCodeData)
        });
      }, function (error) {
        console.log(error);
      });
    },
    checkLocationServiceStatus: function (successCallback) {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
        if (enabled) {
          successCallback();
        } else {
          cordova.plugins.diagnostic.switchToLocationSettings();
        }
      });
    },
    getLocationData: function (successCallback, errorCallback) {
      this.checkLocationServiceStatus(function () {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      });
    }
  });
});
