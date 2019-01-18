/* global define*/
define([
  'require',
  'exports',
  'marionette',
  'backbone',
  'js/app',
  'templates/compiledTemplates'
], function (require,
             exports,
             Marionette,
             Backbone,
             app,
             compiledTemplates) {
  'use strict';

  exports.UserView = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/user.hbs']({ 
        userName: localStorage.getItem('userName'),
        orgName: localStorage.setItem('orgName'),
        email: localStorage.setItem('email') 
      });
    },
    events: {
      'click #save': 'saveUserDeatils'
    },
    saveUserDeatils: function () {
      var userName = this.$el.find('#userName').val();
      var orgName = this.$el.find('#orgName').val();
      var email = this.$el.find('#email').val();
      if( userName && orgName && email) {
        localStorage.setItem('email', email);
        localStorage.setItem('userName', userName);
        localStorage.setItem('orgName', orgName);
        app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
      }
    }
  });
});
