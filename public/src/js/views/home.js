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
  'materialize',
  'js/app',
  'js/models/asset',
  'js/models/event',
  'templates/compiledTemplates',
  'web3',
  'ambrosus'
], function (require,
             exports,
             $,
             _,
             Backbone,
             Marionette,
             materialize,
             app,
             asset,
             event,
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
      'click #getAsset': 'showAssets',
      'click #addEvent': 'createEvent'
    },
    createAsset: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          asset.assetModel.set({ productId: result.text });
          console.log(result.text);
          app.FTMobile.AppRouter.navigate('createAsset/', { trigger: true });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
    },
    createEvent: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          app.FTMobile.ambrosus.getEvents({ "data[productId]": result.text }).then(function (response) {
            // Response if successful
            event.eventModel.set({ assetId: response.data.results[0].content.idData.assetId });
            console.log(result.text);
            app.FTMobile.AppRouter.navigate('createEvent/', { trigger: true });
          }).catch(function (error) {
            // Error if error
            console.log(error);
          });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
    },
    showAssets: function () {
      var self = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          app.FTMobile.ambrosus.getEvents({ "data[productId]": result.text }).then(function (response) {
            // Response if successful
            app.FTMobile.ambrosus.getEvents(
              { assetId: response.data.results[0].content.idData.assetId }).then(function (response) {
              response.data.results.forEach(function (eventObj) {
                event.eventCollection.add(eventObj);
              });
              console.log(result.text);
              app.FTMobile.AppRouter.navigate('assets/', { trigger: true });
            }).catch(function (error) {
              // Error if error
              console.log(error);
            });
          }).catch(function (error) {
            // Error if error
            console.log(error);
          });
        },
        function (error) {
          console.log("Error in bar code scanner ", error);
        }
      );
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
            "data":[
              {
                "type": "ambrosus.asset.info",
                "productId": "abcd",
                "name": "PURE DARK CHOCOLATE BAR 92% blah 3",
                "assetType": "ambrosus.assetTypes.batch",
                "images": {
                  "default": {
                    "url": "http://imageurlgoeshere.com/file.extension"
                  }
                },
                "size": "2.64 oz.",
                "Product Information": {
                  "attributes": "No-GMOs, Vegan, Gluten Free, Kosher, Soy Free",
                  "ingredients": "Organic cocoa beans, organic sugar, organic cocoa butter",
                  "Brand": "Madecasse"
                },
                "Batch Information": {
                  "Origin": "Madagascar"
                }
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
