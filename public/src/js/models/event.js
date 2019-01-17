/* global define */

define([
  'require',
  'exports',
  'backbone'
], function (require,
             exports,
             Backbone) {
  'use strict';

  var Events;
  var Event = Backbone.Model.extend({
    defaults: {
      content: {
        data: [],
        idData: {},
        signature: ''
      },
      eventId: '',
      metaData: {}

    }
  });

  exports.eventModel = new Event();

  Events = Backbone.Collection.extend({
    model: Event
  });

  exports.eventCollection = new Events();
});
