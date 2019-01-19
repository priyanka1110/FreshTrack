/* global define, Offline, cordova*/
define([
  'require',
  'exports',
  'underscore',
  'jquery',
  'moment',
  'marionette',
  'backbone',
  'templates/compiledTemplates'
], function (require,
             exports,
             _,
             $,
             moment,
             Marionette,
             Backbone,
             compiledTemplates) {
  'use strict';

  exports.closeModalBehavior = Marionette.Behavior.extend({
    initialize: function () {
      Backbone.pubSub.on('unbindModalEvents', this.closeModal, this);
    },
    events: {
      'click #closeModal': 'closeModal'
    },
    closeModal: function () {
      $('#modal').modal('close');
      $('body').css('width', '');
      this.view.undelegateEvents();
      $('.lean-overlay').remove();
      Backbone.pubSub.off('unbindModalEvents');
      $('#modal').html('');
    }
  });

  exports.LocationServiceView = Marionette.View.extend({
    el: '#modal',
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/noLocationServiceTpl.hbs']();
    },
    events: {
      'click #enable': 'locationSettings'
    },
    behaviors: [
      { behaviorClass: this.closeModalBehavior }
    ],
    locationSettings: function () {
      cordova.plugins.diagnostic.switchToLocationSettings();
    }
  });
});
