/* global define*/
define([
  'require',
  'exports',
  'marionette',
  'backbone',
  'js/app',
  'js/models/header',
  'templates/compiledTemplates'
], function (require,
             exports,
             Marionette,
             Backbone,
             app,
             header,
             compiledTemplates) {
  'use strict';

  exports.UserView = Marionette.View.extend({
    initialize: function () {
      this.buttonElement = this.$el.find('#orgName');
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/user.hbs']({
        userName: localStorage.getItem('userName'),
        orgName: localStorage.getItem('orgName'),
        email: localStorage.getItem('email'),
        buttonState: this.buttonState
      });
    },
    onAttach: function () {
      this.buttonElement = this.$el.find('#save');
      this.enableDisableButton();
    },
    events: {
      'click #save': 'saveUserDeatils',
      'click #clear': 'clearUserDeatils',
      'change #userName': 'enableDisableButton',
      'change #orgName': 'enableDisableButton',
      'change #email': 'enableDisableButton'
    },
    enableDisableButton: function () {
      var userName = this.$el.find('#userName').val();
      var orgName = this.$el.find('#orgName').val();
      var email = this.$el.find('#email').val();
      if (!userName || !orgName || !email) {
        this.buttonElement.attr('disabled', 'disabled');
      } else {
        this.buttonElement.removeAttr('disabled');
      }
    },
    saveUserDeatils: function () {
      var userName = this.$el.find('#userName').val();
      var orgName = this.$el.find('#orgName').val();
      var email = this.$el.find('#email').val();
      if (userName && orgName && email) {
        localStorage.setItem('email', email);
        localStorage.setItem('userName', userName);
        localStorage.setItem('orgName', orgName);
        app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
      }
    },
    clearUserDeatils: function () {
      this.$el.find('#userName').val('');
      this.$el.find('#orgName').val('');
      this.$el.find('#email').val('');
      this.enableDisableButton();
    },
    onDestroy: function () {
      header.headerModel.set({ closeButton: false });
    }
  });
});
