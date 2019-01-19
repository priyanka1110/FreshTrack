/* global define*/
/* global cordova, device */
define([
  'require',
  'exports',
  'marionette',
  'backbone',
  'materialize',
  'js/app',
  'js/models/header',
  'templates/compiledTemplates'
], function (require,
             exports,
             Marionette,
             Backbone,
             materialize,
             app,
             header,
             compiledTemplates) {
  'use strict';

  exports.HeaderView = Marionette.View.extend({
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/header.hbs']({
        headerText: this.model.get('headerText'),
        closeButton: this.model.get('closeButton'),
        headerButtons: this.model.get('headerButtons')
      });
    },
    events: {
      'click #editProfile': 'editProfile',
      'click #showConfirmationCode': 'showConfirmationCode',
      'click #close': 'goToHomePage'
    },
    goToHomePage: function () {
      header.headerModel.set({ closeButton: false });
      app.FTMobile.AppRouter.navigate('homePage/', { trigger: true });
    },
    editProfile: function () {
      header.headerModel.set({ currentPage: 'profile' });
      app.FTMobile.AppRouter.navigate('users/', { trigger: true });
    },
    showConfirmationCode: function () {
      app.FTMobile.AppRouter.navigate('confirmationCode/show/', { trigger: true });
    },
    onDestroy: function () {
      // this.model.clear().set(this.model.defaults);
    }
  });
});
