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
      var self = this;
      this.getLocationData(function () {
        // qrCodeData.location.latitude = position.coords.latitude;
        // qrCodeData.location.longitude = position.coords.longitude;
        qrCodeData.confirmtationCodeGeneratedAt = moment().format();
        $(self.el).find('#confirmationCode').html('');

        $(self.el).find('#confirmationCode').qrcode({
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
    getLocationData: function (successCallback) {
      this.checkLocationServiceStatus(function () {
        // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        successCallback();
      });
    }
  });
  exports.ScanConfirmationCode = Marionette.View.extend({
    initialize: function () {
      this.doneBy = this.options.doneBy;
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/scanConfirmationCode.hbs']();
    },
    onAttach: function () {
    },
    events: {
      'click #scan': 'scanCode'
    },
    scanCode: function () {
      var senderName;
      var senderOrg;
      var receiverName;
      var receiverOrg;
      var secondPartyDetail = JSON.parse(result.text);
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          // assetModel.assetModel.set({ productId: result.text });
          if (this.doneBy === 'sender') {
            senderName = localStorage.getItem('userName');
            senderOrg = localStorage.getItem('orgName');
            receiverName = secondPartyDetail.userName;
            receiverOrg = secondPartyDetail.organizationName;
          } else {
            senderName = secondPartyDetail.userName;
            senderOrg = secondPartyDetail.organizationName;
            receiverName = localStorage.getItem('userName');
            receiverOrg = localStorage.getItem('orgName');
          }
          event.eventModel.set({
            senderName: senderName,
            senderOrg: senderOrg,
            receiverName: receiverName,
            receiverOrg: receiverOrg
          });
          console.log(result.text);
          app.FTMobile.AppRouter.navigate('transactions/', { trigger: true });
        },
        function (error) {
          console.log('Error in bar code scanner ', error);
        }
      );
      // app.FTMobile.AppRouter.navigate('transactions/', { trigger: true });
    }
  });
});
