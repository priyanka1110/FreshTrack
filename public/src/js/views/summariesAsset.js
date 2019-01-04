/* global define, am4core, am4charts, am4themes_animated*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'materialize',
  'js/models/asset',
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
  asset,
  app,
  compiledTemplates
) {
  'use strict';
  exports.SummariesAsset = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/assetEventSummary.hbs']({
        assetName: this.model.get('assetName')
      });
    },
    onAttach: function () {
    },
    events: {
      'click #submit': 'submitAsset'
    },
    formatAssetData: function () {
      return [{
        "content": {
            "data":[
              {
                "type": "ambrosus.asset.info",
                "assetType": "ambrosus.assetTypes.batch",
                "productInformation": {
                  "name": this.model.get('assetName'),
                  "id": this.model.get('productId')
                },
                "location": this.model.get('location'),
                "transferParties": {
                  "sender": {
                    "name": this.model.get('sender'),
                    "org": this.model.get('senderOrganization')
                  },
                  "receiver": {
                    "name": this.model.get('receiver'),
                    "org": this.model.get('receiverOrganization')
                  }
                }
              }
            ]
        }
      }];
    },
    submitAsset: function () {
      var formattedData = this.formatAssetData();
      app.FTMobile.ambrosus.createAsset(formattedData).then(function(response) {
        // Response if successful
        console.log(response);
      }).catch(function(error) {
        // Error if error
        console.log(error);
      });
    },
    onDestroy: function () {
    }
  });
});
