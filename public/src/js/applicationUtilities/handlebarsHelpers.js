/* global define*/
/* eslint-disable */

define([
  'require',
  'handlebars',
  'moment',
  'underscore',
  'js/app',
  './commonFunctions',
  'string'
], function (require,
             Handlebars,
             moment,
             _,
             app,
             commonFunctions,
             str) {
  'use strict';

  Handlebars.registerHelper('humanizeTime', function (isoString) {
    return moment(isoString).format("MMM Do, YYYY");;
  });
  Handlebars.registerHelper('formatEventType', function (eventType) {
    return eventType === 'addAsset' ? 'Asset' : 'Handover';
  });
});
