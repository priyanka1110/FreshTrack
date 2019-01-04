/* global define, am4core, am4charts, am4themes_animated*/

define([
  'exports',
  'marionette',
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'templates/compiledTemplates'
], function (
  exports,
  Marionette,
  $,
  _,
  Backbone,
  moment,
  compiledTemplates
) {
  exports.CheckStatusSummary = Marionette.View.extend({
    initialize: function () {
    },
    render: function () {
      this.el.innerHTML = compiledTemplates['templates/checkStatusSummaryTpl.hbs']({
      });
    },
    onAttach: function () {
    },
    events: {
    },
    onDestroy: function () {
      $('#appBar').parent().removeClass('white appbar-black-text ').addClass('cyan ');
    }
  });
});
