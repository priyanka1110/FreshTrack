/* global define, $, cordova, device, _, mixpanel, infratabOrgId */
/* eslint-disable no-restricted-syntax, new-cap */
define([
  'require',
  'exports',
  'backbone',
  'underscore',
  'moment',
  './app',
  './views/landingPageView',
  'js/views/checkStatusSummary'
], function (require,
             exports,
             Backbone,
             _,
             moment,
             app,
             landingPageView,
             checkStatusSummary) {
  'use strict';

  exports.Router = Backbone.Router.extend({
    routes: {
      'landingPage/': 'landingPage'
    },
    landingPage: function () {
      app.FTMobile.views.landingPageView = new landingPageView.LandingPageView();
      app.FTMobile.rootView.showChildView('bodyRegion', app.FTMobile.views.landingPageView);
    },
    checkStatusSummary: function () {
      app.FTMobile.rootView.showChildView('bodyRegion', new checkStatusSummary.CheckStatusSummary({ }));
    }
  });
});
