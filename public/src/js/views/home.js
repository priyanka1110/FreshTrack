/* eslint-disable */
/* global define */
/* global mixpanel, powerbi */
define([
  'require',
  'exports',
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'js/app',
  'templates/compiledTemplates',
  'web3',
  'ambrosus'
], function (require,
             exports,
             $,
             _,
             Backbone,
             Marionette,
             app,
             compiledTemplates,
             Web3) {
  'use strict';

  exports.HomeView = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/homePage.hbs']();
    },
    events: {
      'click #addAsset': 'createAsset',
      'click #getAsset': 'getAsset'
    },
    createAsset: function () {
      app.FTMobile.AppRouter.navigate('createAsset/', { trigger: true });
    },
    getAsset: function () {
      this.ambrosus = new AmbrosusSDK({
        // Provide env variables
        secret: '0x77a205c98095ae3218fae2ea197355bdf53a6aa65bb6b5a7a5a7dbf6d3048bfc',
        address: '0x4267346d85270127740f00A16D19aC836D2d798b',
        Web3: Web3,
        apiEndpoint: 'https://gateway-test.ambrosus.com'
      });
      this.ambrosus.getAssetById('0x46debb0de0e1ce401da205aa1522df7911488651089e9c5e360802decf1d987d').then(function(response) {
        // Response if successful
        console.log(response);
      }).catch(function(error) {
        // Error if error
        console.log(error);
      });

    },
    showStatus: function () {
      this.ambrosus = new AmbrosusSDK({
        // Provide env variables
        secret: '0x77a205c98095ae3218fae2ea197355bdf53a6aa65bb6b5a7a5a7dbf6d3048bfc',
        address: '0x4267346d85270127740f00A16D19aC836D2d798b',
        Web3: Web3,
        apiEndpoint: 'https://gateway-test.ambrosus.com'
      });
      console.log('status here...');
      // app.FTMobile.AppRouter.navigate('summary/checkStatus', { trigger: true });

      var eventData = [{
        'type': 'ambrosus.asset.info',
        'name': 'PURE DARK CHOCOLATE BAR 94%',
        'assetType': 'ambrosus.assetTypes.batch',
        'images': {
          'default': {
            'url': 'http://imageurlgoeshere.com/file.extension'
          }
        },
        'size': '2.64 oz.',
        'Product Information': {
          'attributes': 'No-GMOs, Vegan, Gluten Free, Kosher, Soy Free',
          'ingredients': 'Organic cocoa beans, organic sugar, organic cocoa butter',
          'Brand': 'Madecasse'
        },
        'Batch Information': {
          'Origin': 'Madagascar'
        }
      }];

      var assetData = [{
          "content": {
              "idData": {
                  "timestamp": 1519817101
              },
              "data": [{
                  "type": "ambrosus.asset.info",
                  "name": "PURE DARK CHOCOLATE BAR 92%",
                  "scannedData": this.scannedData
              }]
          }
      }];

      this.ambrosus.createAsset(assetData).then(function(response) {
        // Response if successful
        console.log(response);
      }).catch(function(error) {
        // Error if error
        console.log(error);
      });

      // var assetId = '0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a12345';
      // this.ambrosus.createEvent(eventData).then(function(response) {
      //   // Response if successful
      //   console.log(response);
      // }).catch(function(error) {
      //   // Error if error
      //   console.log(error);
      // });
    }
  });
});
