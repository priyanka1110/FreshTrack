/* global define, device, M, cordova */

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
  'js/models/event',
  'js/models/header',
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
  event,
  header,
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
      // this.getLocationData(function (position) {
      //   qrCodeData.location.latitude = position.coords.latitude;
      //   qrCodeData.location.longitude = position.coords.longitude;
      qrCodeData.confirmtationCodeGeneratedAt = moment().format();
      $(self.el).find('#confirmationCode').html('');

      $(self.el).find('#confirmationCode').qrcode({
        text: JSON.stringify(qrCodeData)
      });
      // }, function (error) {
      //   console.log(error);
      // });
    },
    checkLocationServiceStatus: function (successCallback) {
      cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
        var elems;
        var instance;
        if (enabled) {
          successCallback();
        } else {
          elems = document.querySelectorAll('.modal');
          M.Modal.init(elems);
          instance = M.Modal.getInstance(elems[0]);
          instance.open();
        }
      });
    },
    getLocationData: function (successCallback) {
      this.checkLocationServiceStatus(function () {
        // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        successCallback();
      });
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
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
    getFormData: function () {
      var eventDetails = {
        name: this.model.get('title') || '',
        points: this.options.event.get('points'),
        senderName: this.options.event.get('senderName'),
        senderOrg: this.options.event.get('senderOrg'),
        receiverName: this.options.event.get('receiverName'),
        receiverOrg: this.options.event.get('receiverOrg'),
        addedBy: localStorage.getItem('userName'),
        device: device.uuid,
        type: 'ambrosus.asset.info',
        time: moment.utc().toISOString(),
        eventType: 'handover'
      };
      event.eventModel.set(eventDetails);
      return eventDetails;
    },
    cancel: function () {
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    addEvent: function () {
      var eventDetails = {
        content: {
          data: [
            this.getFormData()
          ]
        }
      };
      app.FTMobile.ambrosus.createEvent(this.model.get('assetId'), eventDetails).then(function (response) {
        // Response if successful
        app.FTMobile.AppRouter.navigate('success/', { trigger: true });
        console.log(response);
      }).catch(function (error) {
        // Error if error
        console.log(error);
      });
    },
    scanCode: function () {
      var senderName;
      var senderOrg;
      var receiverName;
      var receiverOrg;
      var secondPartyDetail;
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          // assetModel.assetModel.set({ productId: result.text });
          secondPartyDetail = JSON.parse(result.text);
          if (!secondPartyDetail.userName ||
            !secondPartyDetail.organizationName ||
            !secondPartyDetail.deviceId) {
            app.FTMobile.AppRouter.navigate('errorPage/confirmationCode/', { trigger: true });
          }
          if (self.doneBy === 'shipper') {
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
          header.headerModel.set({ currentPage: 'handover' });
          self.addEvent();
        },
        function (error) {
          console.log('Error in bar code scanner ', error);
        }
      );
      // app.FTMobile.AppRouter.navigate('transactions/', { trigger: true });
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
    }
  });
});
