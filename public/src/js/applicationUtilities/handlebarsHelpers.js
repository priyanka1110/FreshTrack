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

  Handlebars.registerHelper('readableIndex', function (number) {
    return number + 1;
  });

});
